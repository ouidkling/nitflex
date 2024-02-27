function text(username) {
	return `Hello ${username}, your account as been successfully created !
Welcome to the NITFLEX family, we hope you'll enjoy your journey !

If you have any question, feel free to contact us at support@niflex.eu.
Best regards,
NITFLEX Team


This is an automated message, please do not reply.`;
}

function html(username) {
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
}

module.exports = {
	text,
	html,
};