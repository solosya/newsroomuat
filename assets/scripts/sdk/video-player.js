
(function ($) {

    $.fn.videoPlayer = function (options) {
        var defaults = {
            type: "html",
            scrolling: "no",
            fitToView: false,
            autoSize: false,
            width: 650,
            height: 460,
            maxWidth: "90%",
            aspectRatio: true,
            startVolume: 0.8,
            loop: false,
            enableAutosize: true,
            features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'],
            alwaysShowControls: false,
            iPadUseNativeControls: false,
            iPhoneUseNativeControls: false,
            AndroidUseNativeControls: false,
            alwaysShowHours: false,
            showTimecodeFrameCount: false,
            framesPerSecond: 25,
            enableKeyboard: true,
            pauseOtherPlayers: true
        };

        var opts = $.extend({}, defaults, options);
        return this.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var elem = $(this);
            var source = elem.data('source');
            var poster = elem.data('poster');
            var caption = elem.data('caption');

            var url, content;
            
            if (source.trim() !== 'undefined' && source.trim() !== "") {
                var videoId = elem.data('video-id');
                if (source.trim() === 'youtube') {
                    if (videoId !== "" && typeof videoId !== "undefined") {
                        url = "http://www.youtube.com/watch?v=" + videoId;
                    } else {
                        url = $(elem).data('url');
                    }
                    content = "<video width='" + opts.width + "' height='" + opts.height + "' class='videoPlayer' controls='controls' preload='none'><source type='video/youtube' src='" + url + "' /></video>";
                }
                else if (source.trim() === 'vimeo') {
                    if (videoId !== "" && typeof videoId !== "undefined") {
                         url = "https://vimeo.com/" + videoId;
                    } else {
                        url = $(elem).data('url');
                    }
                    opts.features = [];
                    content = "<video width='" + opts.width + "' height='" + opts.height + "' class='videoPlayer' controls='controls' preload='none'><source type='video/vimeo' src='" + url + "' /></video>";
                }
                else if (source.trim() === 'cloudinary' || source.trim() === 'instagram' || source.trim() === 'twitter' || source === 'facebook') {
                    url = elem.data('url');
                    content = "<video class ='videoPlayer' src='" + url + "' poster='" + poster + "' width='" + opts.width + "' height='" + opts.height + "' controls='controls' preload='none' ></video>";
                }
            }
            
            if (typeof url !== 'undefined' && url !== "") {
                var _player, _isPlaying = false;
                $.fancybox({
                    type: opts.type,
                    scrolling: opts.scrolling,
                    fitToView: opts.fitToView,
                    autoSize: opts.autoSize,
                    maxWidth: opts.maxWidth,
                    aspectRatio: opts.aspectRatio,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    },
                    beforeLoad: function () {
                        this.content = content; //"<video class ='videoPlayer' src='" + url + "' poster='" + poster + "' width='" + opts.width + "' height='" + opts.height + "' controls='controls' preload='none' ></video>";
                        this.title = caption;
                        this.width = opts.width;
                        this.height = opts.height;
                    },
                    afterShow: function () {
                        new MediaElementPlayer('.videoPlayer', {
                            defaultVideoWidth: this.width,
                            defaultVideoHeight: this.height,
                            startVolume: opts.startVolume,
                            loop: opts.loop,
                            enableAutosize: opts.enableAutosize,
                            features: opts.features,
                            alwaysShowControls: opts.alwaysShowControls,
                            iPadUseNativeControls: opts.iPadUseNativeControls,
                            iPhoneUseNativeControls: opts.iPhoneUseNativeControls,
                            AndroidUseNativeControls: opts.AndroidUseNativeControls,
                            alwaysShowHours: opts.alwaysShowHours,
                            showTimecodeFrameCount: opts.showTimecodeFrameCount,
                            framesPerSecond: opts.framesPerSecond,
                            enableKeyboard: opts.enableKeyboard,
                            pauseOtherPlayers: opts.pauseOtherPlayers,
                            success: function (mediaElement, domObject) {
                                _player = mediaElement;
                                _player.load();
                                _player.play();
                                _player.addEventListener('playing', function () {
                                    _isPlaying = true;
                                }, false);
                                if (source.trim() == 'vimeo') { alert();
                                    $('.mejs-controls').remove();
                                }
                            }
                        });
                    },
                    beforeClose: function () {
                        if (_isPlaying && navigator.userAgent.match(/msie [6-8]/i)) {
                            _player.remove();
                            _isPlaying = false;
                        }
                    }
                });
            }
        });
    };
}(jQuery));