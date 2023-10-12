(function($) {
	var _page = "";
	var _tlen = 0;
	var $terminal;
	var $cursor;
	var $code;

	function _blink() {
		$cursor.toggle(0);
	}

	$.fn.bgTerminal = function (options, callback) {
		$terminal = $(this);

		var settings = $.extend({
            url: null,
            speed: 200,
            wait: 1000,
            glow: false
        }, options );

        function _emulateTerminal() {
        	var text = _page.substring(0, _tlen);
        	$code.text(text);

        	if (_tlen < _page.length) {
        		setTimeout(_emulateTerminal, (_page[_tlen] == '\n') ? settings.wait : settings.speed);
        		_tlen++;
        	}
        }

        function _setSpeed(speed, wait) {
        	speed = parseInt(speed);
        	wait = parseInt(wait);

        	settings.speed = (speed < 0) ? 1 : speed;
        	settings.wait = (wait < 0) ? 1 : wait;
        }

        function speed() {
        	return {
        		speed: settings.speed,
        		wait: settings.wait
        	}
        }

        function speedUp(amount) {
        	amount = parseInt(amount);
        	if (!amount || amount < 0) {
        		amount = 1.5;
        	}
        	
        	_setSpeed(settings.speed / amount, settings.wait / amount);
        }

        function speedDown(amount) {
        	amount = parseInt(amount);
        	if (!amount || amount < 0) {
        		amount = 1.5;
        	}
        	
        	_setSpeed(settings.speed * amount, settings.wait * amount);
        }

        if (settings.url) {
        	$.get(settings.url, function(res) {
        		_page = res;

        		$terminal.addClass('bgterminal');

        		// create cursor
        		$cursor = $('<span>');
        		$cursor.addClass('cursor');
        		$cursor.html('&nbsp;');
        		setInterval(_blink, 400);
 
        		// add code element
        		$code = $('<span>');
        		$terminal.append($code);
        		$terminal.append($cursor);

        		if (settings.glow) {
        			$terminal.addClass('bgterminal-glow');
        		}
        		
        		$terminal.data('bgterminal', {
        			speedUp: speedUp,
        			speedDown: speedDown,
        			speed: speed
        		});

        		_emulateTerminal();
			});
		}

		if (typeof callback == "function") {
			callback(this);
		}

		return this;
    }
})(jQuery);