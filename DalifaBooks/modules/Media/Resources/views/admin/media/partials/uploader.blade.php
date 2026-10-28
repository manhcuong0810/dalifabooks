@push('globals')
    <script>
        DalifaBooks.maxFileSize = {{ (int) ini_get('upload_max_filesize') }}
    </script>
@endpush

<form method="POST" class="dropzone">
    {{ csrf_field() }}

    <div class="dz-message needsclick">
        {{ trans('media::media.drop_files_here') }}
        <span class="help-block" style="display:block; margin-top: 8px; font-size: 12px; color: #888;">
            <i class="fa fa-info-circle"></i> Định dạng: JPG, PNG, WEBP, SVG, GIF. Khuyến nghị tối ưu ảnh &lt; 500KB để trang web tải nhanh nhất.
        </span>
    </div>
</form>
