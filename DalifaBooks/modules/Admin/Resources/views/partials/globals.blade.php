<script>
    window.DalifaBooks = {
        version: '{{ dalifabooks_version() }}',
        csrfToken: '{{ csrf_token() }}',
        baseUrl: '{{ trim(localized_url(locale(), url('/')),'/') }}',
        rtl: {{ is_rtl() ? 'true' : 'false' }},
        locale: '{{ locale() }}',
        supportedLocales: @json(supported_locales()),
        langs: {},
        data: {},
        errors: {},
        selectize: [],
        defaultCurrencySymbol: '{{ currency_symbol(setting("default_currency")) }}'
    };

    DalifaBooks.langs['admin::admin.buttons.delete'] = '{{ trans('admin::admin.buttons.delete') }}';
    DalifaBooks.langs['media::media.file_manager.title'] = '{{ trans('media::media.file_manager.title') }}';
    DalifaBooks.langs['admin::admin.table.search_here'] = '{{ trans('admin::admin.table.search_here') }}';
    DalifaBooks.langs['admin::admin.table.showing_start_end_total_entries'] = '{{ trans('admin::admin.table.showing_start_end_total_entries') }}';
    DalifaBooks.langs['admin::admin.table.showing_empty_entries'] = '{{ trans('admin::admin.table.showing_empty_entries') }}';
    DalifaBooks.langs['admin::admin.table.show_menu_entries'] = '{{ trans('admin::admin.table.show_menu_entries') }}';
    DalifaBooks.langs['admin::admin.table.filtered_from_max_total_entries'] = '{{ trans('admin::admin.table.filtered_from_max_total_entries') }}';
    DalifaBooks.langs['admin::admin.table.no_data_available_table'] = '{{ trans('admin::admin.table.no_data_available_table') }}';
    DalifaBooks.langs['admin::admin.table.loading'] = '{{ trans('admin::admin.table.loading') }}';
    DalifaBooks.langs['admin::admin.table.no_matching_records_found'] = '{{ trans('admin::admin.table.no_matching_records_found') }}';
    DalifaBooks.langs['core::messages.something_went_wrong'] = '{{ trans('core::messages.something_went_wrong') }}';
</script>

@stack('globals')
