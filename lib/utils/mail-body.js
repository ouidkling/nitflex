'use strict';

module.exports = {
	newUserText(username) {
		return `Hello ${username}, your account as been successfully created !
Welcome to the NITFLEX family, we hope you'll enjoy your journey !

If you have any question, feel free to contact us at support@niflex.eu.
Best regards,
NITFLEX Team


This is an automated message, please do not reply.`;
	},

	newUserHtml(username) {
		return `<h1 style="color: #14e509">NITFLEX</h1>
<p>Hello <b>${username}</b>, your account as been successfully created !</p>
<p>Welcome to the <b style="color: #14e509">NITFLEX</b> family, we hope you'll enjoy your journey !</p>
<br>
<p>If you have any question, feel free to contact us at <a href="mailto:support@niflex.eu">support@nitflex.eu</a>.</p>
<p>Best regards,</p>
<h3>NITFLEX Team</h3>
<br>
<br>
<p><i>This is an automated message, please do not reply.</i></p>
`;
	},

	newMovieText(username, movie, poster) {
		return `Hey ${username}, a new movie as been added to the catalogue!
Go check out ${movie} and let us know what you think about it!
Poster: ${poster}


This is an automated message, please do not reply.`;
	},

	newMovieHtml(username, movie, poster) {
		return `<h1 style="color: #14e509">NITFLEX</h1>
<p>Hey <b>${username}</b>, a new movie as been added to the catalogue!</p>
<p>Go check out <b>${movie}</b> and let us know what you think about it!</p>
<img src="${poster}" alt="Poster of the movie ${movie}" style="width: 300px;">
<br>
<br>
<p><i>This is an automated message, please do not reply.</i></p>
`;
	},

	updatedMovieText(username, movie) {
		return `Hey ${username}, ${movie}, one of your favorite movie, as been updated!


This is an automated message, please do not reply.`;
	},

	updatedMovieHtml(username, movie) {
		return `<h1 style="color: #14e509">NITFLEX</h1>
<p>Hey <b>${username}</b>, <b>${movie}</b>, one of your favorite movie, as been updated!</p>
<br>
<br>
<p><i>This is an automated message, please do not reply.</i></p>
`;
	},

	exportMoviesText(username) {
		return `Hello ${username}, as requested, movies list as been exported and is available in the linked CSV file!


This is an automated message, please do not reply.`;
	},

	exportMoviesHtml(username) {
		return `<h1 style="color: #14e509">NITFLEX</h1>
<p>Hello <b>${username}</b>, as requested, movies list as been exported and is available in the linked CSV file!</p>
<br>
<br>
<p><i>This is an automated message, please do not reply.</i></p>
`;
	},
};
