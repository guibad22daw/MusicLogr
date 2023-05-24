import React, { useEffect, useState } from 'react'

export const useFetchArtist = (artistId, accessToken,) => {
    const [artist, setArtist] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    // Recupera l'informació de l'artista
    const fetchArtist = async () => {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();

        if (result.status == 401) {
            window.location.href = `/login?message=${encodeURIComponent("error")}`;
            return;
        }

        setArtist(data);
        setLoading1(false);
    };

    // Recupera els àlbums de l'artista
    const fetchArtistAlbums = async () => {
        let offset = 0;
        const limit = 50;
        let allData = [];

        while (true) {
            const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=50&offset=${offset}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const { items } = await result.json();
            allData = allData.concat(items);

            if (items.length < limit) {
                break;
            }
            offset += limit;
        }
        setArtistAlbums(allData)
        setLoading2(false);
    };

    useEffect(() => {
        fetchArtist();
        fetchArtistAlbums();
    }, [artistId])

    if (loading1 || loading2) {
        return { loading }
    }

    return { loading:false, artist, artistAlbums, setArtistAlbums }
}
