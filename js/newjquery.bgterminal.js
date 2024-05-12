(function($) {
    var Terminal = function(options) {
      this.options = $.extend({
        url: null,
        speed: 200,
        wait: 1000,
        glow: false,
      }, options);
  
      this.$terminal = $(this);
      this.$cursor = $('<span>');
      this.$cursor.addClass('cursor');
      this.$code = $('<span>');
      this.$terminal.append(this.$code);
      this.$terminal.append(this.$cursor);
  
      if (this.options.glow) {
        this.$terminal.addClass('bgterminal-glow');
      }
  
      this.terminal = this;
    };
  
    Terminal.prototype = {
      start: function() {
        $.get(this.options.url, function(res) {
          this._page = res;
          this._tlen = 0;
  
          this.$terminal.addClass('bgterminal');
  
          this._emulateTerminal();
        }.bind(this));
      },
  
      _emulateTerminal: function() {
        var text = this._page.substring(0, this._tlen);
        this.$code.text(text);
  
        if (this._tlen < this._page.length) {
          setTimeout(this._emulateTerminal.bind(this), (this._page[this._tlen] === '\n') ? this.options.wait : this.options.speed);
          this._tlen++;
        }
      },
  
      speedUp: function(amount) {
        amount = parseInt(amount);
        if (!amount || amount < 0) {
          amount = 1.5;
        }
        this.options.speed /= amount;
        this.options.wait /= amount;
      },
  
      speedDown: function(amount) {
        amount = parseInt(amount);
        if (!amount || amount < 0) {
          amount = 1.5;
        }
        this.options.speed *= amount;
        this.options.wait *= amount;
      },
  
      _blink: function() {
        this.$cursor.toggle(0);
      },
    };
  
    $.fn.bgTerminal = function(options) {
      return this.each(function() {
        var terminal = new Terminal(options);
        terminal.start();
        this.data('bgterminal', terminal);
      });
    };
  })(jQuery);