import React from 'react';
import './App.css';
import OrgChart from '@unicef/react-org-chart';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import avatarPersonnel from './assets/avatar-personnel.svg';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: null,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    };
  }

  componentDidMount() {
    // Fetch the data and transform it once the component is mounted.
    axios.get("https://worker1.bradyangzy.workers.dev/organization-chart")
      .then(response => {
        const transformedData = this.transformData(response.data);
        this.setState({ tree: transformedData });
      });
  }

  transformData = (jsonData) => {
    const departments = {};

    jsonData.forEach((employee) => {
      if (!departments[employee.department]) {
        departments[employee.department] = {
          manager: null,
          employees: []
        };
      }

      if (employee.isManager === "TRUE") {
        departments[employee.department].manager = employee;
      } else {
        departments[employee.department].employees.push(employee);
      }
    });

    const hierarchy = {
      id: "Organization",
      person: {
        id: "Organization",
        avatar: avatarPersonnel,
        department: '',
        name: 'Organization',
        title: '',
      },
      children: []
    };

    for (let department in departments) {
      const manager = departments[department].manager;
      const managerNode = {
        id: manager.name,
        person: {
          id: manager.name,
          avatar: avatarPersonnel,
          department: manager.department,
          name: manager.name,
          title: `${manager.department} (Manager)`,
        },
        children: []
      };

      departments[department].employees.forEach((employee) => {
        managerNode.children.push({
          id: employee.name,
          person: {
            id: employee.name,
            avatar: avatarPersonnel,
            department: employee.department,
            name: employee.name,
            title: `${employee.department}`
          }
        });
      });

      hierarchy.children.push(managerNode);
    }

    return hierarchy;
  };

  render() {
    const { tree, downloadingChart } = this.state;

    const downloadImageId = 'download-image';
    const downloadPdfId = 'download-pdf';

    return (
      <BrowserRouter basename="/react-org-chart">
        <Route exact path="/">
          <React.Fragment>
            <div className="zoom-buttons">
              <button className="btn btn-outline-primary zoom-button" id="zoom-in">+</button>
              <button className="btn btn-outline-primary zoom-button" id="zoom-out">-</button>
            </div>
            <div className="download-buttons">
              <button className="btn btn-outline-primary" id="download-image">Download as image</button>
              <button className="btn btn-outline-primary" id="download-pdf">Download as PDF</button>
              <a className="github-link" href="https://github.com/unicef/react-org-chart">Github</a>
              {downloadingChart && <div>Downloading chart</div>}
            </div>
            {tree && (
              <OrgChart
                tree={tree}
                downloadImageId={downloadImageId}
                downloadPdfId={downloadPdfId}
                loadImage={d => Promise.resolve(avatarPersonnel)}
              />
            )}
          </React.Fragment>
        </Route>
      </BrowserRouter>
    );
  }
}
