export const transformCast = (cast) => {
    if (cast && cast.length && cast.length > 0) {
        return cast.map((member) => ({
            id: member.id,
            name: member.name,
            role: member.character,
            imagePath: member.profile_path
                ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg',
        }));
    }
    return undefined;
};

export const transformCrew = (crew) => {
    if (crew && crew.length && crew.length > 0) {
        let newCrew = {};
        crew.forEach((member) => {
            if (member.department) {
                if (!newCrew[member.department]) {
                    newCrew[member.department] = [];
                }
                newCrew[member.department].push({
                    id: member.id,
                    name: member.name,
                    role: member.job,
                    imagePath: member.profile_path
                        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                        : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg',
                });
            }
        });
        return newCrew;
    }
    return undefined;
}
