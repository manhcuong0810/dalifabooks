@push('shortcuts')
    <dl class="dl-horizontal">
        <dt><code>b</code></dt>
        <dd>{{ trans('admin::admin.shortcuts.back_to_index', ['name' => trans('variation::variations.variation')]) }}</dd>
    </dl>
@endpush

@push('globals')
    <script>
        DalifaBooks.langs['variation::variations.group.general'] = '{{ trans('variation::variations.group.general') }}';
        DalifaBooks.langs['variation::attributes.name'] = '{{ trans('variation::attributes.name') }}';
        DalifaBooks.langs['variation::attributes.type'] = '{{ trans('variation::attributes.type') }}';
        DalifaBooks.langs['variation::variations.form.variation_types.please_select'] = '{{ trans('variation::variations.form.variation_types.please_select') }}';
        DalifaBooks.langs['variation::variations.form.variation_types.text'] = '{{ trans('variation::variations.form.variation_types.text') }}';
        DalifaBooks.langs['variation::variations.form.variation_types.color'] = '{{ trans('variation::variations.form.variation_types.color') }}';
        DalifaBooks.langs['variation::variations.form.variation_types.image'] = '{{ trans('variation::variations.form.variation_types.image') }}';
        DalifaBooks.langs['variation::variations.group.values'] = '{{ trans('variation::variations.group.values') }}';
        DalifaBooks.langs['variation::variations.form.label'] = '{{ trans('variation::variations.form.label') }}';
        DalifaBooks.langs['variation::variations.form.color'] = '{{ trans('variation::variations.form.color') }}';
        DalifaBooks.langs['variation::variations.form.image'] = '{{ trans('variation::variations.form.image') }}';
        DalifaBooks.langs['variation::variations.form.add_row'] = '{{ trans('variation::variations.form.add_row') }}';
        DalifaBooks.langs['admin::admin.buttons.save'] = '{{ trans('admin::admin.buttons.save') }}';
    </script>
@endpush

@push('scripts')
    <script type="module">
        keypressAction([{
            key: 'b',
            route: "{{ route('admin.variations.index') }}"
        }, ]);
    </script>
@endpush
