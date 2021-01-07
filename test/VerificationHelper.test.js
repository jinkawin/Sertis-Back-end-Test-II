const assert = require('assert')
const chai = require('chai')
var expect = chai.expect
var verificationHelper = require('../Lib/Helper/VerificationHelper')

describe('ValidationHelper: isCredentialValid()', () => {
    it('returns true when there are username and password', () => {
        var requestBody = {
            username: "Jinkawin",
            password: "12345"
        }
        expect(verificationHelper.isCredentialValid(requestBody)).to.be.true
       });

    it('returns false when there is only password', () => {
        var requestBody = {
            password: "12345"
        }
        expect(verificationHelper.isCredentialValid(requestBody)).to.be.false
   });

   it('returns false when there is only username', () => {
        var requestBody = {
            username: "Jinkawin"
        }
        expect(verificationHelper.isCredentialValid(requestBody)).to.be.false
    });


    it('returns false when username is empty', () => {
        var requestBody = {
            username: "",
            password: "12345"
        }
        expect(verificationHelper.isCredentialValid(requestBody)).to.be.false
    });

    it('returns false when password is empty', () => {
        var requestBody = {
            username: "Jinkawin",
            password: ""
        }
        expect(verificationHelper.isCredentialValid(requestBody)).to.be.false
   });

   it('returns false when username and password are empty', () => {
        var requestBody = {
            username: "",
            password: ""
        }
        expect(verificationHelper.isCredentialValid(requestBody)).to.be.false
   });
});

describe('ValidationHelper: isTokenValid()', () => {
    it('returns true when there is token', () => {
        var requestBody = {
            token: "thisistoken"
        }
        expect(verificationHelper.isTokenValid(requestBody)).to.be.true
    });

    it('returns false when there is NO token', () => {
        var requestBody = {
            username: "Jinkawin"
        }
        expect(verificationHelper.isTokenValid(requestBody)).to.be.false
    });

    it('returns false when token is empty', () => {
        var requestBody = {
            token: ""
        }
        expect(verificationHelper.isTokenValid(requestBody)).to.be.false
    });
});

describe('ValidationHelper: isUsernameValid()', () => {
    it('returns true when there is username', () => {
        var requestBody = {
            username: "Jinkawin"
        }
        expect(verificationHelper.isUsernameValid(requestBody)).to.be.true
    });

    it('returns false when there is NO username', () => {
        var requestBody = {
            token: "thisistoken"
        }
        expect(verificationHelper.isUsernameValid(requestBody)).to.be.false
    });

    it('returns false when username is empty', () => {
        var requestBody = {
            username: ""
        }
        expect(verificationHelper.isUsernameValid(requestBody)).to.be.false
    });
});

describe('ValidationHelper: isUserAlreadyExisted()', () => {
    it('returns true there are error name and error code 11000', () => {
        var error = {
            name: "MongoError",
            code: 11000
        }
        expect(verificationHelper.isUserAlreadyExisted(error)).to.be.true
    });

    it('returns false when error name is wrong', () => {
        var error = {
            name: "success",
            code: 11000
        }
        expect(verificationHelper.isUserAlreadyExisted(error)).to.be.false
    });

    it('returns false when error code is wrong', () => {
        var error = {
            name: "MongoError",
            code: 12800
        }
        expect(verificationHelper.isUserAlreadyExisted(error)).to.be.false
    });

    it('returns false when error code and error name are wrong', () => {
        var error = {
            name: "Success",
            code: 12800
        }
        expect(verificationHelper.isUserAlreadyExisted(error)).to.be.false
    });
});

describe('ValidationHelper: isUserAbleToEditCard()', () => {
    it('returns true when authencicated user edit the card', () => {
        var user = {
            username: "Jinkawin"
        }
        var card = {
            author: "Jinkawin"
        }
        expect(verificationHelper.isUserAbleToEditCard(user, card)).to.be.true
    });

    it('returns false when UNauthencicated user edit the card', () => {
        var user = {
            username: "Peter"
        }
        var card = {
            author: "Jinkawin"
        }
        expect(verificationHelper.isUserAbleToEditCard(user, card)).to.be.false
    });

    it('returns false when authencicated user edit the wrong card', () => {
        var user = {
            username: "Jinkawin"
        }
        var card = {
            author: "Peter"
        }
        expect(verificationHelper.isUserAbleToEditCard(user, card)).to.be.false
    });

    it('returns false when card is empty', () => {
        var user = {
            username: "Jinkawin"
        }
        var card = {}
        expect(verificationHelper.isUserAbleToEditCard(user, card)).to.be.false
    });
});