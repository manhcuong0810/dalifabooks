@extends('admin::layout')

@component('admin::components.page.header')
    @slot('title', trans('admin::resource.create', ['resource' => trans('product::products.product')]))

    <li><a href="{{ route('admin.products.index') }}">{{ trans('product::products.products') }}</a></li>
    <li class="active">{{ trans('admin::resource.create', ['resource' => trans('product::products.product')]) }}</li>
@endcomponent

@section('content')
    <div id="app" v-cloak></div>
@endsection

@include('product::admin.products.partials.shortcuts')
@include('product::admin.products.partials.scripts')

@push('globals')
    <script>
        // Auto-heal corrupted section order in localStorage
        ['product-form-left-sections', 'product-form-right-sections'].forEach(function(key) {
            try {
                var order = JSON.parse(localStorage.getItem(key));
                if (!Array.isArray(order) || order.length === 0) {
                    localStorage.removeItem(key);
                }
            } catch (e) {
                localStorage.removeItem(key);
            }
        });
    </script>

    @vite([
        'modules/Product/Resources/assets/admin/sass/main.scss',
        'modules/Product/Resources/assets/admin/js/main.js',
        'modules/Attribute/Resources/assets/admin/sass/main.scss',
        'modules/Variation/Resources/assets/admin/sass/main.scss',
        'modules/Option/Resources/assets/admin/sass/main.scss',
        'modules/Media/Resources/assets/admin/sass/main.scss',
        'modules/Media/Resources/assets/admin/js/main.js',
    ])
@endpush
