const PROFILE_QUERY = `*[_type == "profile"][0]{
    name,
    role,
    bio,
    profileImage {
        asset-> {
            url
        }
        alt
    },
    email,
    socialLinks[] {
        platform,
        url
    }
}`;
export default PROFILE_QUERY;
