const useGenres = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";

    const genreIds = selectedGenres.map((genre) => genre.id);       //fetch all the ids of selectedGenres
    return genreIds.reduce((a,b) => a + "," + b);
};

// genreIds will be array of ids [32 48 42] // reduce will convert it into normal comma separated values // after reduce => 32,48,32

export default useGenres;