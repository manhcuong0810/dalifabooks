@extends('storefront::public.layout')

@section('title')
    @if (request()->has('query'))
        {{ trans('storefront::products.search_results_for') }}: "{{ request('query') }}"
    @else
        {{ trans('storefront::products.shop') }}
    @endif
@endsection

@section('content')
    <section
        x-data="ProductIndex"
        class="product-search-wrap"
    >
        <div class="container">
            <div class="product-search">
                <div class="product-search-left">
                    <div class="product-filter-wrap" :class="{ active: $store.layout.isOpenSidebarFilter }">
                        <div class="product-filter-header d-lg-none">
                            <h4>
                                {{ trans('storefront::products.filters') }}
                            </h4>

                            <svg @click="$store.layout.closeSidebarFilter()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M15.8338 4.16663L4.16705 15.8333M4.16705 4.16663L15.8338 15.8333" stroke="#0E1E3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>

                        <div class="product-filter-content custom-scrollbar">
                            @if ($categories->isNotEmpty())
                                <div class="browse-categories-wrap">
                                    <h4 class="section-title">
                                        {{ trans('storefront::products.browse_categories') }}
                                    </h4>

                                    <h6 class="d-block d-lg-none">{{ trans('storefront::products.categories') }}</h6>

                                    @include('storefront::public.products.index.browse_categories')
                                </div>
                            @endif
                            
                            @include('storefront::public.products.index.filter')
                        </div>
                    </div>

                    @include('storefront::public.products.index.latest_products')
                </div>


                <div class="product-search-right">
                    <template x-if="brandBanner">
                        <div class="d-none d-lg-block categories-banner">
                            <img :src="brandBanner" alt="Brand banner">
                        </div>
                    </template>
                    
                    <template x-if="!brandBanner && categoryBanner">
                        <div class="d-none d-lg-block categories-banner">
                            <img :src="categoryBanner" alt="Category banner">
                        </div>
                    </template>

                    @include('storefront::public.products.index.search_result')
                </div>
            </div>
        </div>
    </section>
@endsection

@push('globals')
    <script>
        DalifaBooks.data['initialQuery'] = '{{ addslashes(request('query')) }}';
        DalifaBooks.data['initialBrandName'] = '{{ addslashes($brandName ?? '') }}';
        DalifaBooks.data['initialBrandBanner'] = '{{ addslashes($brandBanner ?? '') }}';
        DalifaBooks.data['initialBrandSlug'] = '{{ addslashes(request('brand')) }}';
        DalifaBooks.data['initialCategoryName'] = '{{ addslashes($categoryName ?? '') }}';
        DalifaBooks.data['initialCategoryBanner'] = '{{ addslashes($categoryBanner ?? '') }}';
        DalifaBooks.data['initialCategorySlug'] = '{{ addslashes(request('category')) }}';
        DalifaBooks.data['initialTagName'] = '{{ addslashes($tagName ?? '') }}';
        DalifaBooks.data['initialTagSlug'] = '{{ addslashes(request('tag')) }}';
        DalifaBooks.data['initialAttribute'] = @json((object) request('attribute', []));
        DalifaBooks.data['minPrice'] = {{ $minPrice }};
        DalifaBooks.data['maxPrice'] = {{ $maxPrice }};
        DalifaBooks.data['initialSort'] = '{{ addslashes(request('sort', 'latest')) }}';
        DalifaBooks.data['initialPage'] = {{ addslashes(request('page', 1)) }};
        DalifaBooks.data['initialPerPage'] = {{ addslashes(request('perPage', 20)) }};
        DalifaBooks.data['initialViewMode'] = '{{ addslashes(request('viewMode', 'grid')) }}';
        DalifaBooks.langs['storefront::products.showing_results'] = '{{ trans("storefront::products.showing_results") }}';
    </script>
    
    @vite([
        'modules/Storefront/Resources/assets/public/sass/pages/products/index/main.scss',
        'modules/Storefront/Resources/assets/public/js/pages/products/index/main.js',
    ])
@endpush
