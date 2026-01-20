// Export the combination query of the Blog listing page and Profile details
const HOME_QUERY = `
  {
    "blogData" : *[_type == "blog"] | order(_createdAt desc)[0...3],
    "profile" : *[_type == "profile"][0]
  }
`;

export default HOME_QUERY;
