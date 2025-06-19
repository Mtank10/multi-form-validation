// Mock database
const database = {
  countries: [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'United Kingdom' },
    { id: 4, name: 'Australia' },
    { id: 5, name: 'India' }
  ],
  states: {
    'United States': ['California', 'Texas', 'New York', 'Florida'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
    'India': ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu']
  },
  cities: {
    'California': ['Los Angeles', 'San Francisco', 'San Diego'],
    'Texas': ['Houston', 'Dallas', 'Austin'],
    'New York': ['New York City', 'Buffalo', 'Rochester'],
    'Ontario': ['Toronto', 'Ottawa', 'Mississauga'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval'],
    'England': ['London', 'Manchester', 'Birmingham'],
    'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen'],
    'New South Wales': ['Sydney', 'Newcastle', 'Wollongong'],
    'Victoria': ['Melbourne', 'Geelong', 'Ballarat'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Delhi': ['New Delhi', 'Noida', 'Gurgaon']
  }
};

// Mock API functions
export const fetchCountries = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(database.countries);
    }, 500);
  });
};

export const fetchStates = async (country) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(database.states[country] || []);
    }, 500);
  });
};

export const fetchCities = async (state) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(database.cities[state] || []);
    }, 500);
  });
};