@hasAccess('admin.media.index')
    @php
        $autoHints = [
            'storefront_favicon' => 'Kích thước đề xuất: <strong>32 x 32 px</strong> hoặc <strong>64 x 64 px</strong> (định dạng .ico, .png, .svg)',
            'translatable[storefront_header_logo]' => 'Kích thước đề xuất: <strong>220 x 48 px</strong> (chiều cao 40 - 50 px, nền trong suốt PNG/SVG)',
            'translatable[storefront_mail_logo]' => 'Kích thước đề xuất: <strong>200 x 60 px</strong> (chiều cao 50 - 70 px)',
            'translatable[admin_logo]' => 'Kích thước đề xuất: <strong>220 x 48 px</strong> (hiển thị trên thanh Sidebar CMS)',
            'translatable[admin_small_logo]' => 'Kích thước đề xuất: <strong>48 x 48 px</strong> (icon vuông khi thu gọn Sidebar)',
            'pwa_icon' => 'Kích thước chuẩn PWA: <strong>512 x 512 px</strong> (hình vuông, PNG chất lượng cao)',
            'storefront_newsletter_bg_image' => 'Kích thước đề xuất: <strong>300 x 400 px</strong> (tỷ lệ 3:4, chiều cao ~400px)',
            'storefront_accepted_payment_methods_image' => 'Kích thước đề xuất: <strong>260 x 28 px</strong> (chiều cao 24 - 32 px, SVG/PNG)',
            'files[logo]' => 'Kích thước đề xuất: <strong>120 x 120 px</strong> (tỷ lệ 1:1 vuông, SVG hoặc PNG trong suốt)',
            'files[banner]' => 'Kích thước đề xuất: <strong>870 x 250 px</strong> (hoặc 1140 x 300 px, tỷ lệ ~3.5:1)',
            'files[background_image]' => 'Kích thước đề xuất: <strong>250 x 300 px</strong> (dùng cho nền Mega menu dropdown)',
            'storefront_three_column_full_width_banners_background_file_id' => 'Kích thước đề xuất: <strong>1920 x 500 px</strong> (ảnh nền khối banner tràn trang)',
        ];
        $hintText = $help ?? ($autoHints[$inputName] ?? null);
    @endphp

    <div class="single-image-wrapper">
        <h4>{{ $title }}</h4>

        @if ($hintText)
            <div class="image-picker-hint text-muted" style="font-size: 12px; margin-top: -3px; margin-bottom: 9px; color: #64748b; line-height: 1.4;">
                <i class="fa fa-info-circle text-info" style="margin-right: 3px;"></i> {!! $hintText !!}
            </div>
        @endif

        <button type="button" class="image-picker btn btn-default" data-input-name="{{ $inputName }}">
            <i class="fa fa-folder-open m-r-5"></i>{{ trans('media::media.browse') }}
        </button>

        <div class="clearfix"></div>

        <div class="single-image image-holder-wrapper clearfix">
            @if (!$file->exists)
                <div class="image-holder placeholder">
                    <i class="fa fa-picture-o"></i>
                </div>
            @else
                <div class="image-holder">
                    <img src="{{ $file->path }}">
                    <button type="button" class="btn remove-image" data-input-name="{{ $inputName }}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6.00098 17.9995L17.9999 6.00053" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.9999 17.9995L6.00098 6.00055" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <input type="hidden" name="{{ $inputName }}" value="{{ $file->id }}">
                </div>
            @endif
        </div>
    </div>
@endHasAccess
