class ReleasePreviewCtrl {
    constructor($state, User, Releases) {
        "ngInject";
        this._User = User;
        this._Releases = Releases;
        // this.$onInit = function () {
        //     if (this._User.current) this.canModify = (this._User.current.username == this.tweet.author.username ? true : false);
        // };

    }

}

let ReleasePreview = {
    bindings: {
        release: '='
    },
    controller: ReleasePreviewCtrl,
    templateUrl: 'components/releases-helpers/release-preview.html'
};

export default ReleasePreview;