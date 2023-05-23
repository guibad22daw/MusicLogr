import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import './ArtistPage.css'
import { Carregant } from '../../components/Carregant/Carregant';
import { Separador } from '../../components/Separador';
import { BiFilter } from 'react-icons/bi';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';

const ArtistPage = () => {
    const { artistId } = useParams();
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [artist, setArtist] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistAlbumsSort, setArtistAlbumsSort] = useState("desc");
    const [showDropdown, setShowDropdown] = useState(false)

    const fetchArtist = async () => {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        setArtist(data);
        setLoading1(false);
    };

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

    const ordenarHandler = (string) => {

        setShowDropdown(false);
        if (string === 'asc') {
            if (artistAlbumsSort === 'desc') {
                setArtistAlbumsSort('asc');
                setArtistAlbums(artistAlbums.reverse())
            }
        } else if (string === 'desc') {
            if (artistAlbumsSort === 'asc') {
                setArtistAlbumsSort('desc');
                setArtistAlbums(artistAlbums.reverse())
            }
        }
    }

    return (
        <div className='artistPage'>
            {
                loading1 || loading2 ? <Carregant /> : (
                    <div className="container-xxl artistContainer">
                        <div className='artistHeader shadow-sm'>
                            <div className="bg-ArtistHeader" style={{ backgroundImage: `url("${artist.images[0].url}")` }}></div>
                            <div className="artistInfo-container">
                                <div className='artistImage'>
                                    <img src={artist.images[0].url} alt="" />
                                </div>
                                <div className='artist-info'>
                                    <h1>{artist.name}</h1>
                                    <h5>{artist.followers.total} <label>SEGUIDORS</label></h5>
                                </div>
                            </div>
                        </div>
                        <div className='artist-filtrarContainer' onClick={() => setShowDropdown(!showDropdown)} style={showDropdown ? {backgroundColor: "white", color: "black"} : {}}>
                            <BiFilter style={{color: showDropdown? "black" : "white"}} size="1.5em" />
                            <h5 className='artist-albumsTitle'>Filtrar</h5>
                            <div className="filtrar-div" style={showDropdown ? { visibility: "visible", opacity: 1, top: "2px" } : {}} >
                                <ul>
                                    <li onClick={() => ordenarHandler("asc")}><HiSortAscending color='white' size="1.3em" />Ordenar ascendentment</li>
                                    <li onClick={() => ordenarHandler("desc")}><HiSortDescending color='white' size="1.3em" />Ordenar descendentment</li>
                                </ul>
                            </div>
                        </div>
                        <div className='artist-albumsContainer shadow-sm'>
                            {
                                artistAlbums.length === 0 ? (<h2 className='noAlbums'>No tens cap àlbum en aquesta categoria.</h2>) : (

                                    <div className='artistAlbums'>
                                        {

                                            artistAlbums.map((album) => {
                                                return (
                                                    <div className="album" key={album.id}>
                                                        <div className="albumImage">
                                                            <LazyLoadImage
                                                                src={album.images[1].url}
                                                                alt={`album ${album.name} image`}
                                                                effect="blur"
                                                                className='albumImage-img'
                                                                onClick={() => window.location.href = `/album/${album.id}`}
                                                            />
                                                        </div>
                                                        <div className="albumInfo">
                                                            <h6 className='albumName'>{album.name}</h6>
                                                            <h6 className='albumYear' style={{ fontSize: "14px" }}>{album.release_date.length > 4 ? album.release_date.substring(0, 4) : album.release_date}</h6>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )

            }
            <Separador />
        </div>
    )
}

export default ArtistPage;
