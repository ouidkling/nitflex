'use strict';

exports.seed = async function (knex) {
	// using TMDB API
	const API_KEY = process.env.TMDB_API_KEY;
	const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
	const TOP_URL = 'https://api.themoviedb.org/3/movie/top_rated?page=';
	const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';
	const CREDITS_URL = '/credits'; // append to MOVIE_URL/id

	let movies = [];
	let topUrl = '';
	let movieUrl = '';
	let creditsUrl = '';
	let options = {};
	let page = 1;

	while (page <= 25) {
		topUrl = TOP_URL + page.toString();
		options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${API_KEY}`,
			},
		};

		await fetch(topUrl, options)
			.then((response) => {
				return response.json();
			})
			.then(async (topData) => {
				if (topData.success === false) {
					throw new Error('TMDB API request failed');
				}

				for (const topMovie in topData.results) {
					movieUrl =
						MOVIE_URL + topData.results[topMovie].id.toString();
					await fetch(movieUrl, options)
						.then((response) => {
							return response.json();
						})
						.then(async (movieData) => {
							creditsUrl =
								MOVIE_URL +
								movieData.id.toString() +
								CREDITS_URL;
							await fetch(creditsUrl, options)
								.then((response) => {
									return response.json();
								})
								.then((creditsData) => {
									const director =
										creditsData.crew.find(
											(person) =>
												person.job === 'Director'
										).name ?? 'Unknown';
									movies.push({
										title: movieData.title,
										release: new Date(
											movieData.release_date
										),
										duration: movieData.runtime,
										director,
										about: movieData.overview,
										tagline: movieData.tagline,
										budget: movieData.budget,
										revenue: movieData.revenue,
										poster:
											IMAGE_URL + movieData.poster_path,
									});
								});
						});
				}
			})
			.catch(() => {
				console.error(
					'Error fetching data from the TMDB API, inserting dummy data instead.'
				);
				movies = [
					{
						title: 'The Shawshank Redemption',
						release: new Date('1994-09-23'),
						duration: 142,
						director: 'Frank Darabont',
						about: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
						tagline:
							'Fear can hold you prisoner. Hope can set you free.',
						budget: 25000000,
						revenue: 28341469,
						poster: 'https://example.com/posters/shawshank.jpg',
					},
					{
						title: 'The Godfather',
						release: new Date('1972-03-24'),
						duration: 175,
						director: 'Francis Ford Coppola',
						about: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
						tagline: "An offer you can't refuse.",
						budget: 6000000,
						revenue: 245066411,
						poster: 'https://example.com/posters/godfather.jpg',
					},
					{
						title: 'The Dark Knight',
						release: new Date('2008-07-18'),
						duration: 152,
						director: 'Christopher Nolan',
						about: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
						tagline: 'Why so serious?',
						budget: 185000000,
						revenue: 1004558444,
						poster: 'https://example.com/posters/dark_knight.jpg',
					},
					{
						title: '12 Angry Men',
						release: new Date('1957-04-10'),
						duration: 96,
						director: 'Sidney Lumet',
						about: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
						tagline:
							'Life is in their hands. Death is on their minds.',
						budget: 350000,
						revenue: 1000000,
						poster: 'https://example.com/posters/12_angry_men.jpg',
					},
					{
						title: "Schindler's List",
						release: new Date('1994-02-04'),
						duration: 195,
						director: 'Steven Spielberg',
						about: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
						tagline:
							'Whoever saves one life, saves the world entire.',
						budget: 22000000,
						revenue: 321365567,
						poster: 'https://example.com/posters/schindlers_list.jpg',
					},
				];
				page = 20;
			});
		page++;
	}
	return knex('movie')
		.del()
		.then(() => {
			return knex('movie').insert(movies);
		});
};
