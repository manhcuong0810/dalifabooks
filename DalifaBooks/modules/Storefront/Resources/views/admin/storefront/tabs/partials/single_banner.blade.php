@php
    $bannerHints = [
        'storefront_slider_banner_1' => 'Kích thước đề xuất: <strong>370 x 248 px</strong> (tỷ lệ ~3:2, 2 banner cạnh slider)',
        'storefront_slider_banner_2' => 'Kích thước đề xuất: <strong>370 x 248 px</strong> (tỷ lệ ~3:2, 2 banner cạnh slider)',
        'storefront_three_column_full_width_banners_1' => 'Kích thước đề xuất: <strong>450 x 250 px</strong> (tỷ lệ ~1.8:1, chia 3 cột tràn trang)',
        'storefront_three_column_full_width_banners_2' => 'Kích thước đề xuất: <strong>450 x 250 px</strong> (tỷ lệ ~1.8:1, chia 3 cột tràn trang)',
        'storefront_three_column_full_width_banners_3' => 'Kích thước đề xuất: <strong>450 x 250 px</strong> (tỷ lệ ~1.8:1, chia 3 cột tràn trang)',
        'storefront_three_column_full_width_banners_banner_1' => 'Kích thước đề xuất: <strong>450 x 250 px</strong> (tỷ lệ ~1.8:1, chia 3 cột tràn trang)',
        'storefront_three_column_full_width_banners_banner_2' => 'Kích thước đề xuất: <strong>450 x 250 px</strong> (tỷ lệ ~1.8:1, chia 3 cột tràn trang)',
        'storefront_three_column_full_width_banners_banner_3' => 'Kích thước đề xuất: <strong>450 x 250 px</strong> (tỷ lệ ~1.8:1, chia 3 cột tràn trang)',
        'storefront_two_column_banners_1' => 'Kích thước đề xuất: <strong>690 x 215 px</strong> (tỷ lệ ~3.2:1, banner đôi trang chủ)',
        'storefront_two_column_banners_2' => 'Kích thước đề xuất: <strong>690 x 215 px</strong> (tỷ lệ ~3.2:1, banner đôi trang chủ)',
        'storefront_two_column_banners_banner_1' => 'Kích thước đề xuất: <strong>690 x 215 px</strong> (tỷ lệ ~3.2:1, banner đôi trang chủ)',
        'storefront_two_column_banners_banner_2' => 'Kích thước đề xuất: <strong>690 x 215 px</strong> (tỷ lệ ~3.2:1, banner đôi trang chủ)',
        'storefront_three_column_banners_1' => 'Kích thước đề xuất: <strong>450 x 180 px</strong> (tỷ lệ 2.5:1, banner 3 cột trang chủ)',
        'storefront_three_column_banners_2' => 'Kích thước đề xuất: <strong>450 x 180 px</strong> (tỷ lệ 2.5:1, banner 3 cột trang chủ)',
        'storefront_three_column_banners_3' => 'Kích thước đề xuất: <strong>450 x 180 px</strong> (tỷ lệ 2.5:1, banner 3 cột trang chủ)',
        'storefront_three_column_banners_banner_1' => 'Kích thước đề xuất: <strong>450 x 180 px</strong> (tỷ lệ 2.5:1, banner 3 cột trang chủ)',
        'storefront_three_column_banners_banner_2' => 'Kích thước đề xuất: <strong>450 x 180 px</strong> (tỷ lệ 2.5:1, banner 3 cột trang chủ)',
        'storefront_three_column_banners_banner_3' => 'Kích thước đề xuất: <strong>450 x 180 px</strong> (tỷ lệ 2.5:1, banner 3 cột trang chủ)',
        'storefront_one_column_banner' => 'Kích thước đề xuất: <strong>1410 x 310 px</strong> (hoặc 1200 x 264 px, tỷ lệ ~4.5:1, banner đơn ngang)',
        'storefront_product_page_banner' => 'Kích thước đề xuất: <strong>260 x 350 px</strong> hoặc <strong>260 x 400 px</strong> (tỷ lệ đứng ~3:4 hoặc 2:3, cột trái trang chi tiết sản phẩm)',
    ];
    $bannerHint = $help ?? ($bannerHints[$name] ?? 'Kích thước đề xuất: tỷ lệ ngang phù hợp theo vị trí');
@endphp

<div class="panel">
    <div class="panel-header">
        <h5>{{ $label }}</h5>
        <div class="banner-hint text-muted" style="font-size: 12px; font-weight: normal; margin-top: 3px; color: #64748b;">
            <i class="fa fa-info-circle text-info"></i> {!! $bannerHint !!}
        </div>
    </div>

    <div class="panel-body">
        @hasAccess('admin.media.index')
            <div class="panel-image image-holder">
                @if (is_null($banner->image->path))
                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                    <img class="hide">
                @else
                    <img src="{{ $banner->image->path }}" alt="Banner">
                    <button type="button" class="btn remove-image">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6.00098 17.9995L17.9999 6.00053" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.9999 17.9995L6.00098 6.00055" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                @endif

                <input type="hidden" name="translatable[{{ $name }}_file_id]" value="{{ $banner->image->id }}" class="banner-file-id">
            </div>
        @endHasAccess

        <div class="panel-content clearfix">
            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-6 clearfix">
                    <div class="form-group">
                        <label for="{{ $name }}-call-to-action-url">{{ trans("storefront::attributes.call_to_action_url") }}</label>
                        <input type="text" name="{{ $name }}_call_to_action_url" value="{{ $banner->call_to_action_url }}" class="form-control" id="{{ $name }}-call-to-action-url">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-6">
                    <div class="checkbox">
                        <input type="hidden" name="{{ $name }}_open_in_new_window" value="0">
                        <input type="checkbox" name="{{ $name }}_open_in_new_window" value="1" id="{{ $name }}-open-in-new-window" {{ $banner->open_in_new_window ? 'checked' : '' }}>
                        <label for="{{ $name }}-open-in-new-window">
                            {{ trans("storefront::attributes.open_in_new_window") }}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
