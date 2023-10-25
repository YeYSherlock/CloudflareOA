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
      id: 2,
      person: {
        id: 2,
        name: 'Oliver',
        title: 'CDN',
        salary: 80,
        office: "Lisbon",
        skills: ['React', 'Node', 'Javascript'],
        totalReports: 2,
      },
      hasChild: true,
      children: [
        {
          id: 3,
          person: {
            id: 3,
            name: 'Tony',
            title: 'CDN',
            salary: 80,
            office: "Lisbon",
            skills: ['React', 'Node', 'Javascript'],
            totalReports: 0,
          },
          hasChild: false,
          children: [],
        },
        {
          id: 4,
          person: {
            id: 4,
            name: 'Henry',
            title: 'CDN',
            salary: 80,
            office: "Lisbon",
            skills: ['React', 'Node', 'Javascript'],
            totalReports: 0,
          },
          hasChild: false,
          children: [],
        },
      ],
    }, 
    {
      id: 5,
      person: {
        id: 5,
        name: 'Swain',
        title: 'Game Theory',
        salary: 80,
        office: "Lisbon",
        skills: ['React', 'Node', 'Javascript'],
        totalReports: 2,
      },
      hasChild: true,
      children: [
        {
          id: 6,
          person: {
            id: 6,
            name: 'Tony',
            title: 'Game Theory',
            salary: 80,
            office: "Lisbon",
            skills: ['React', 'Node', 'Javascript'],
            totalReports: 0,
          },
          hasChild: false,
          children: [],
        },
        {
          id: 7,
          person: {
            id: 22,
            name: 'Henry',
            title: 'Game Theory',
            salary: 80,
            office: "Lisbon",
            skills: ['React', 'Node', 'Javascript'],
            totalReports: 0,
          },
          hasChild: false,
          children: [],
        },
      ],
    }, 
  ]
}


