import React from 'react'
import './App.css'
import OrgChart from '@unicef/react-org-chart'
import { BrowserRouter, Route } from 'react-router-dom'
import avatarPersonnel from './assets/avatar-personnel.svg'

let idCounter = 1;

// convert from the input org tree format to the format expected by react-org-chart
function convertToOrgTree(jsonData) {
  const data = JSON.parse(jsonData); // Parse JSON data into JavaScript object
  const orgTree = {
    id: idCounter++,
    person: {
      id: idCounter++,
      name: 'Organization',
      totalReports: data.organization.departments.length,
    },
    hasChild: true,
    children: [],
    expanded: true
  };

  for (let department of data.organization.departments) {
    let deptNode = {
      id: idCounter++,
      person: {
        id: idCounter++,
        name: department.managerName,
        title: department.name,
        salary: department.employees.find(e => e.isManager).salary,
        office: department.employees.find(e => e.isManager).office,
        skills: department.employees.find(e => e.isManager).skills,
        totalReports: department.employees.length - 1, // -1 for excluding manager
      },
      hasChild: true,
      children: [],
      expanded: true
    };

    for (let employee of department.employees) {
      if (!employee.isManager) {
        deptNode.children.push({
          id: idCounter++,
          person: {
            id: idCounter++,
            name: employee.name,
            title: department.name,
            salary: employee.salary,
            office: employee.office,
            skills: employee.skills,
            totalReports: 0, // Employees (non-managers) have no direct reports in this data
          },
          hasChild: false,
          children: [],
          expanded: true
        });
      }
    }

    orgTree.children.push(deptNode);
  }

  return orgTree;
}


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      orgTree: null,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
  }

  componentDidMount() {
    fetch("https://worker1.bradyangzy.workers.dev/organization-chart")
      .then(response => response.json())
      .then(data => {
        const orgTreeData = convertToOrgTree(JSON.stringify(data));
        this.setState({ orgTree: orgTreeData });
      })
      .catch(error => console.error('Error fetching org chart data:', error));
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = config => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }
  

  render() {
    const { orgTree, downloadingChart } = this.state

    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'

    return (
      <BrowserRouter basename="/react-org-chart">
        <Route exact path="/">
          <React.Fragment>
            <div className="info-line">
                react-org-chart doesn't support fully extended view upon startup, click on each to view the supervisees.
            </div>
            <div className="zoom-buttons">
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-in"
              >
                +
              </button>
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-out"
              >
                -
              </button>
            </div>
            <div className="download-buttons">
              <button className="btn btn-outline-primary" id="download-image">
                Download as image
              </button>
              <button className="btn btn-outline-primary" id="download-pdf">
                Download as PDF
              </button>
              <a
                className="github-link"
                href="https://github.com/unicef/react-org-chart"
              >
                Github
              </a>
              {downloadingChart && <div>Downloading chart</div>}
            </div>
            {orgTree && <OrgChart
              tree={ orgTree }
              downloadImageId={downloadImageId}
              downloadPdfId={downloadPdfId}
              onConfigChange={config => {
                this.handleOnChangeConfig(config)
              }}
              loadConfig={d => {
                let configuration = this.handleLoadConfig(d)
                if (configuration) {
                  return configuration
                }
              }}
              downlowdedOrgChart={d => {
                this.handleDownload()
              }}
              loadImage={d => {
                return Promise.resolve(avatarPersonnel)
              }}
            />}
          </React.Fragment>
        </Route>
      </BrowserRouter>
    )
  }
}
