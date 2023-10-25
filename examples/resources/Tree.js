export const orgTree = {
  id: 1,
  person: {
    id: 1,
    name: 'Organization',
    totalReports: 2,
  },
  hasChild: true,
  children: [
    {
      id: 36,
      person: {
        id: 36,
        name: 'Henry monger',
        department: 'wow',
        salary: 80,
        office: "Lisbon",
        title: 'Manager',
        skills: ['React', 'Node', 'Javascript'],
        totalReports: 2,
      },
      hasChild: true,
      children: [
        {
          id: 2,
          person: {
            id: 2,
            name: 'Henry monger',
            department: 'wow',
            salary: 80,
            office: "Lisbon",
            title: 'Manager',
            skills: ['React', 'Node', 'Javascript'],
            totalReports: 2,
          },
          hasChild: false,
          children: [],
        },
        {
          id: 3,
          person: {
            id: 3,
            name: 'Henry monger',
            department: 'wow',
            salary: 80,
            office: "Lisbon",
            title: 'Manager',
            skills: ['React', 'Node', 'Javascript'],
            totalReports: 2,
          },
          hasChild: false,
          children: [],
        },
      ],
    },
    {
      id: 32,
      person: {
        id: 100,
        name: 'Henry monger',
        department: 'e',
        salary: 80,
        office: "Lisbon",
        title: 'Manager',
        skills: ['React', 'Node', 'Javascript'],
        totalReports: 2,
      },
      hasChild: false,
      children: [],
    },
  ],
}


