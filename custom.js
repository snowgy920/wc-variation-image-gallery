(function($) {

    $(document).ready(function(){
        function initVariationZoom(){
            setTimeout(function(){
                if (theme.product_zoom && (!('ontouchstart' in document) || (('ontouchstart' in document) && theme.product_zoom_mobile))) {
                    var zoomConfig = {
                        responsive: true,
                        zoomWindowFadeIn: 200,
                        zoomWindowFadeOut: 100,
                        zoomType: js_porto_vars.zoom_type,
                        cursor: 'grab'
                    };

                    if (js_porto_vars.zoom_type == 'lens') {
                        zoomConfig.scrollZoom = js_porto_vars.zoom_scroll;
                        zoomConfig.lensSize = js_porto_vars.zoom_lens_size;
                        zoomConfig.lensShape = js_porto_vars.zoom_lens_shape;
                        zoomConfig.containLensZoom = js_porto_vars.zoom_contain_lens;
                        zoomConfig.lensBorderSize = js_porto_vars.zoom_lens_border;
                        zoomConfig.borderColour = js_porto_vars.zoom_border_color;
                    }

                    if (js_porto_vars.zoom_type == 'inner') {
                        zoomConfig.borderSize = 0;
                    } else {
                        zoomConfig.borderSize = js_porto_vars.zoom_border;
                    }
                }

                if (theme.product_zoom && (!('ontouchstart' in document) || (('ontouchstart' in document) && theme.product_zoom_mobile))) {
                    $('.woo-variation-gallery-slider .wvg-gallery-image img.wp-post-image').each(function() {
                        var $this = $(this);
                        zoomConfig.zoomContainer = $this.parent();
                        if ($.fn.elevateZoom) {
                            $this.elevateZoom(zoomConfig);
                        } else {
                            setTimeout(function() {
                                if ($.fn.elevateZoom) {
                                    $this.elevateZoom(zoomConfig);
                                }
                            }, 1000);
                        }
                    });
                }
            }, 1000);
        }

        $(document).on('wc_variation_form', '.variations_form', function () {
            initVariationZoom();
        });

        $(document).on('woo_variation_gallery_image_loaded', '.woo-variation-gallery-wrapper', function(){
            initVariationZoom();
        });
    });

}).apply(this, [jQuery]);