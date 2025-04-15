

window.jQuery(function ($) {

    // Configuration.
    var featureImagesActiveClass = 'active';
    var featureImagesSelector = '.feature-images';
    var featureImagesContainerSelector = '.feature-images-container';
    var featureImagesSlideConstructor = '<div class="feature-images-slide"></div>';
    var featureImagesItemSelector = '.feature-item';
    var duration = 300;

    $(featureImagesSelector).each(function () {
        var $target = $(this),
            $imageContainer = $target.find(featureImagesContainerSelector),
            $triggers = $target.find(featureImagesItemSelector),
            animating = false;

        // Build the slides and attach them to their triggers.
        $triggers.each(function () {
            var $trigger = $(this);

            var $slide = $(featureImagesSlideConstructor)
                .hide()
                .css('background-image', 'url("' + $trigger.data('feature-image') + '")')
                .appendTo($imageContainer);

            $trigger.data('image-slide', $slide);
        });

        function selectImage($trigger) {
            if (!$trigger.hasClass(featureImagesActiveClass) && !animating) {
                // Activate the appropriate trigger.
                $triggers.removeClass(featureImagesActiveClass);
                $trigger.addClass(featureImagesActiveClass);

                // Slide the images.
                var $previousSlide = $imageContainer.find('.' + featureImagesActiveClass)
                        .removeClass(featureImagesActiveClass),
                    $nextSlide = $trigger.data('image-slide')
                        .addClass(featureImagesActiveClass);

                // If there's a previous slide, slide that to the left or to the
                // right, depending on the index relative to the new slide.
                if ($previousSlide.length) {
                    var previousOffset, nextOffset;

                    // Determine the direction of the slide, depending on the
                    // indexes of the 2 slides.
                    if ($previousSlide.index() < $nextSlide.index()) {
                        previousOffset = '-100%';
                        nextOffset = '100%';
                    } else {
                        previousOffset = '100%';
                        nextOffset = '-100%';
                    }

                    animating = true;

                    // Animate the slides.
                    $nextSlide.css('left', nextOffset).show()
                        .animate({ left: 0 }, duration);

                    $previousSlide
                        .animate({ left: previousOffset }, duration, function () {
                            // Reset the previous slide after animation finished.
                            $previousSlide.hide().css('left', 0);

                            animating = false;
                        });

                // If there's no current slide, just show the next one, without
                // any animations.
                } else {
                    $nextSlide.show();
                }
            }
        }

        $triggers.click(function (ev) {
            selectImage($(this));
        });

        selectImage($triggers.first());
    });

});