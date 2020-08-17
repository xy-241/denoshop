(function($) {
    $(document).ready(function() {
        var $chatbox = $('.chatbox'),
            $chatboxTitleClose = $('.chatbox__title__close'),
            $chatboxTitleClosex = $('.chatbox__title__closex'),
            $chatbotToggle = $('#chatbotToggle')
            $chatbotTogglex = $('#chatbotTogglex')
        $chatboxTitleClose.on('click', function(e) {
            e.stopPropagation();
            $chatbox.removeClass('chatbox--open');
            $chatbox.addClass('chatbox--closed');
            $chatbotToggle.removeClass('toggle--open');
            $chatbotToggle.addClass('toggle--closed');
        });
        $chatboxTitleClosex.on('click', function(e) {
            e.stopPropagation();
            $chatbox.removeClass('chatbox--open');
            $chatbox.addClass('chatbox--closed');
            $chatbotToggle.removeClass('toggle--open');
            $chatbotToggle.addClass('toggle--closed');
        });
        $chatbotToggle.on('click', function(e) {
            e.stopPropagation();
            $chatbox.removeClass('chatbox--closed');
            $chatbox.addClass('chatbox--open');
            $chatbotToggle.addClass('toggle--open');
            $chatbotToggle.removeClass('toggle--closed');
        });
        $chatbotTogglex.on('click', function(e) {
            e.stopPropagation();
            $chatbox.removeClass('chatbox--closed');
            $chatbox.addClass('chatbox--open');
            $chatbotToggle.addClass('toggle--open');
            $chatbotToggle.removeClass('toggle--closed');
        });
    });
})(jQuery);