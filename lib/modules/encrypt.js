'use strict';

const Encrypt = require('@dan/iut-encrypt');

const plainTextPassword = 'motdepasse';

const passwordSha1 = Encrypt.sha1(plainTextPassword);


// Vous pouvez si vous voulez rajouter une méthode afin de comparer un mot de passe

if(Encrypt.compareSha1('motdepassesaisit', passwordSha1)){

    console.log('Connexion validé');
}
