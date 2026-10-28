<?php

return [
    'attributes' => [
        'attribute_set_id' => 'Nhóm thuộc tính',
        'name' => 'Tên',
        'categories' => 'Danh mục',
        'slug' => 'Đường dẫn (URL)',
        'is_filterable' => 'Có thể lọc',
    ],
    'attribute_sets' => [
        'name' => 'Tên',
    ],
    'product_attributes' => [
        'attributes.*.attribute_id' => 'Thuộc tính',
        'attributes.*.values' => 'Giá trị',
    ],
];
