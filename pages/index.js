import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MovieCart from '../components/MovieCart';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [list, setList] = useState([]);
  const [actors, setActors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getMovies = () => {
      axios.get('https://imdb-api.com/API/Search/k_8bb09d72/' + search).then(
        (response) => {
          setList(response.data.results);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    if (search.length > 3) getMovies();
  }, [search]);

  const getActors = (id) => {
    axios.get('https://imdb-api.com/API/FullCast/k_8bb09d72/' + id).then(
      (response) => {
        setActors(response.data.actors);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <Head>
        <title>My Movie App</title>
      </Head>
      <main>
        <div className={styles['container']}>
          <input
            type="text"
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
        <div className={styles['container']}>
          {list.map((element, index) => {
            return (
              <MovieCart
                onClick={() => getActors(element.id)}
                id={element.id}
                key={index}
                title={element.title}
                description={element.description}
                imgSrc={element.image}
              />
            );
          })}
        </div>
        <div className={styles['container']}>
          {actors.map((element, index) => {
            return (
              <MovieCart
                id={element.id}
                key={index}
                title={element.name}
                description={element.asCharacter}
                imgSrc={element.image}
              />
            );
          })}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
