<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

echo "=== BẮT ĐẦU PUSH DỮ LIỆU DALIFA BOOKS VÀO DATABASE ===\n";

DB::statement('SET FOREIGN_KEY_CHECKS=0;');

try {
    // -------------------------------------------------------------
    // 1. TẠO HOẶC CẬP NHẬT DANH MỤC 2 CẤP (8 CHA, MỖI CHA 3-5 CON)
    // -------------------------------------------------------------
    echo "1. Đang cập nhật Danh mục Sách 2 cấp...\n";

    // Xóa liên kết sản phẩm danh mục cũ và danh mục cũ
    DB::table('product_categories')->truncate();
    DB::table('category_translations')->truncate();
    DB::table('categories')->truncate();

    $categoryHierarchy = [
        [
            'name_vi' => 'Sách Văn Học',
            'name_en' => 'Literature Books',
            'slug' => 'sach-van-hoc',
            'children' => [
                ['name_vi' => 'Tiểu Thuyết', 'name_en' => 'Novels', 'slug' => 'tieu-thuyet'],
                ['name_vi' => 'Truyện Ngắn - Tản Văn', 'name_en' => 'Short Stories & Essays', 'slug' => 'truyen-ngan-tan-van'],
                ['name_vi' => 'Trinh Thám - Kinh Dị', 'name_en' => 'Detective & Horror', 'slug' => 'trinh-tham-kinh-di'],
                ['name_vi' => 'Văn Học Cổ Điển', 'name_en' => 'Classic Literature', 'slug' => 'van-hoc-co-dien'],
                ['name_vi' => 'Thơ Ca & Kịch', 'name_en' => 'Poetry & Plays', 'slug' => 'tho-ca-kich'],
            ]
        ],
        [
            'name_vi' => 'Sách Kinh Tế',
            'name_en' => 'Business & Economics',
            'slug' => 'sach-kinh-te',
            'children' => [
                ['name_vi' => 'Quản Trị & Lãnh Đạo', 'name_en' => 'Management & Leadership', 'slug' => 'quan-tri-lanh-dao'],
                ['name_vi' => 'Marketing & Bán Hàng', 'name_en' => 'Marketing & Sales', 'slug' => 'marketing-ban-hang'],
                ['name_vi' => 'Tài Chính & Đầu Tư', 'name_en' => 'Finance & Investment', 'slug' => 'tai-chinh-dau-tu'],
                ['name_vi' => 'Khởi Nghiệp & Làm Giàu', 'name_en' => 'Startup & Wealth', 'slug' => 'khoi-nghiep-lam-giau'],
                ['name_vi' => 'Kinh Tế Học', 'name_en' => 'Economics', 'slug' => 'kinh-te-hoc'],
            ]
        ],
        [
            'name_vi' => 'Sách Kỹ Năng Sống',
            'name_en' => 'Life Skills',
            'slug' => 'sach-ky-nang-song',
            'children' => [
                ['name_vi' => 'Phát Triển Bản Thân', 'name_en' => 'Self Development', 'slug' => 'phat-trien-ban-than'],
                ['name_vi' => 'Kỹ Năng Giao Tiếp', 'name_en' => 'Communication Skills', 'slug' => 'ky-nang-giao-tiep'],
                ['name_vi' => 'Rèn Luyện Nhân Cách', 'name_en' => 'Character Building', 'slug' => 'ren-luyen-nhan-cach'],
                ['name_vi' => 'Tư Duy Tích Cực', 'name_en' => 'Positive Thinking', 'slug' => 'tu-duy-tich-cuc'],
            ]
        ],
        [
            'name_vi' => 'Sách Tâm Lý & Nuôi Dạy Con',
            'name_en' => 'Psychology & Parenting',
            'slug' => 'sach-tam-ly-nuoi-day-con',
            'children' => [
                ['name_vi' => 'Tâm Lý Học Ứng Dụng', 'name_en' => 'Applied Psychology', 'slug' => 'tam-ly-hoc-ung-dung'],
                ['name_vi' => 'Nuôi Dạy Con', 'name_en' => 'Parenting', 'slug' => 'nuoi-day-con'],
                ['name_vi' => 'Hôn Nhân & Gia Đình', 'name_en' => 'Marriage & Family', 'slug' => 'hon-nhan-gia-dinh'],
            ]
        ],
        [
            'name_vi' => 'Sách Thiếu Nhi',
            'name_en' => 'Children Books',
            'slug' => 'sach-thieu-nhi',
            'children' => [
                ['name_vi' => 'Truyện Tranh Thiếu Nhi', 'name_en' => 'Comics & Manga', 'slug' => 'truyen-tranh-thieu-nhi'],
                ['name_vi' => 'Cổ Tích & Thần Thoại', 'name_en' => 'Fairy Tales & Myths', 'slug' => 'co-tich-than-thoai'],
                ['name_vi' => 'Bách Khoa Cho Bé', 'name_en' => 'Children Encyclopedia', 'slug' => 'bach-khoa-cho-be'],
                ['name_vi' => 'Bài Học Đạo Đức', 'name_en' => 'Moral Lessons', 'slug' => 'bai-hoc-dao-duc'],
            ]
        ],
        [
            'name_vi' => 'Sách Lịch Sử & Triết Học',
            'name_en' => 'History & Philosophy',
            'slug' => 'sach-lich-su-triet-hoc',
            'children' => [
                ['name_vi' => 'Lịch Sử Việt Nam', 'name_en' => 'Vietnamese History', 'slug' => 'lich-su-viet-nam'],
                ['name_vi' => 'Lịch Sử Thế Giới', 'name_en' => 'World History', 'slug' => 'lich-su-the-gioi'],
                ['name_vi' => 'Triết Học Phương Đông & Tây', 'name_en' => 'Philosophy', 'slug' => 'triet-hoc'],
                ['name_vi' => 'Văn Hóa & Phong Tục', 'name_en' => 'Culture & Customs', 'slug' => 'van-hoa-phong-tuc'],
            ]
        ],
        [
            'name_vi' => 'Sách Khoa Học & Công Nghệ',
            'name_en' => 'Science & Technology',
            'slug' => 'khoa-hoc-cong-nghe',
            'children' => [
                ['name_vi' => 'Lập Trình & CNTT', 'name_en' => 'Programming & IT', 'slug' => 'lap-trinh-cntt'],
                ['name_vi' => 'Trí Tuệ Nhân Tạo (AI)', 'name_en' => 'Artificial Intelligence', 'slug' => 'ai-data-science'],
                ['name_vi' => 'Khoa Học Vũ Trụ & Tự Nhiên', 'name_en' => 'Space & Science', 'slug' => 'khoa-hoc-vu-tru'],
            ]
        ],
        [
            'name_vi' => 'Sách Ngoại Ngữ',
            'name_en' => 'Foreign Languages',
            'slug' => 'sach-ngoai-ngu',
            'children' => [
                ['name_vi' => 'Tiếng Anh Giao Tiếp', 'name_en' => 'English Communication', 'slug' => 'tieng-anh-giao-tiep'],
                ['name_vi' => 'Luyện Thi IELTS & TOEIC', 'name_en' => 'IELTS & TOEIC Preparation', 'slug' => 'luyen-thi-ielts-toeic'],
                ['name_vi' => 'Tiếng Nhật - Hàn - Trung', 'name_en' => 'Japanese - Korean - Chinese', 'slug' => 'tieng-nhat-han-trung'],
            ]
        ],
    ];

    $categoryMap = []; // slug => category_id
    $parentPos = 1;

    foreach ($categoryHierarchy as $parentData) {
        $parentId = DB::table('categories')->insertGetId([
            'parent_id' => null,
            'slug' => $parentData['slug'],
            'position' => $parentPos++,
            'is_searchable' => 1,
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('category_translations')->insert([
            ['category_id' => $parentId, 'locale' => 'vi', 'name' => $parentData['name_vi']],
            ['category_id' => $parentId, 'locale' => 'en', 'name' => $parentData['name_en']],
        ]);

        $categoryMap[$parentData['slug']] = $parentId;

        $childPos = 1;
        foreach ($parentData['children'] as $childData) {
            $childId = DB::table('categories')->insertGetId([
                'parent_id' => $parentId,
                'slug' => $childData['slug'],
                'position' => $childPos++,
                'is_searchable' => 1,
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('category_translations')->insert([
                ['category_id' => $childId, 'locale' => 'vi', 'name' => $childData['name_vi']],
                ['category_id' => $childId, 'locale' => 'en', 'name' => $childData['name_en']],
            ]);

            $categoryMap[$childData['slug']] = $childId;
        }
    }
    echo "-> Đã tạo 8 danh mục cha và " . (count($categoryMap) - 8) . " danh mục con thành công.\n";

    // -------------------------------------------------------------
    // 2. NHÀ XUẤT BẢN / THƯƠNG HIỆU (BRANDS)
    // -------------------------------------------------------------
    echo "2. Đang cập nhật Nhà xuất bản / Thương hiệu...\n";
    DB::table('brand_translations')->truncate();
    DB::table('brands')->truncate();

    $brands = [
        ['slug' => 'nxb-tre', 'name' => 'NXB Trẻ'],
        ['slug' => 'nxb-kim-dong', 'name' => 'NXB Kim Đồng'],
        ['slug' => 'nha-nam', 'name' => 'Nhã Nam'],
        ['slug' => 'first-news', 'name' => 'First News - Trí Việt'],
        ['slug' => 'alpha-books', 'name' => 'Alpha Books'],
        ['slug' => 'omega-plus', 'name' => 'Omega Plus'],
        ['slug' => 'nxb-phu-nu', 'name' => 'NXB Phụ Nữ'],
        ['slug' => 'nxb-tong-hop', 'name' => 'NXB Tổng Hợp TP.HCM'],
    ];

    $brandMap = [];
    foreach ($brands as $b) {
        $bId = DB::table('brands')->insertGetId([
            'slug' => $b['slug'],
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('brand_translations')->insert([
            ['brand_id' => $bId, 'locale' => 'vi', 'name' => $b['name']],
            ['brand_id' => $bId, 'locale' => 'en', 'name' => $b['name']],
        ]);
        $brandMap[$b['slug']] = $bId;
    }
    echo "-> Đã tạo " . count($brandMap) . " Nhà xuất bản.\n";

    // -------------------------------------------------------------
    // 3. THẺ TỪ KHÓA (TAGS)
    // -------------------------------------------------------------
    echo "3. Đang cập nhật Thẻ từ khóa (Tags)...\n";
    DB::table('product_tags')->truncate();
    DB::table('tag_translations')->truncate();
    DB::table('tags')->truncate();

    $tags = [
        ['slug' => 'sach-van-hoc', 'name_vi' => 'Sách Văn Học', 'name_en' => 'Literature'],
        ['slug' => 'sach-kinh-te', 'name_vi' => 'Sách Kinh Tế', 'name_en' => 'Economics'],
        ['slug' => 'ky-nang-song', 'name_vi' => 'Kỹ Năng Sống', 'name_en' => 'Life Skills'],
        ['slug' => 'ban-chay-nhat', 'name_vi' => 'Bán Chạy Nhất', 'name_en' => 'Best Seller'],
        ['slug' => 'phat-trien-ban-than', 'name_vi' => 'Phát Triển Bản Thân', 'name_en' => 'Self Help'],
        ['slug' => 'sach-thieu-nhi', 'name_vi' => 'Sách Thiếu Nhi', 'name_en' => 'Children Books'],
        ['slug' => 'khuyen-mai-hot', 'name_vi' => 'Khuyến Mãi Hot', 'name_en' => 'Hot Deals'],
        ['slug' => 'sach-moi', 'name_vi' => 'Sách Mới', 'name_en' => 'New Arrivals'],
    ];

    $tagIds = [];
    $tagMap = [];
    foreach ($tags as $t) {
        $tId = DB::table('tags')->insertGetId([
            'slug' => $t['slug'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('tag_translations')->insert([
            ['tag_id' => $tId, 'locale' => 'vi', 'name' => $t['name_vi']],
            ['tag_id' => $tId, 'locale' => 'en', 'name' => $t['name_en']],
        ]);
        $tagIds[] = $tId;
        $tagMap[$t['slug']] = $tId;
    }
    echo "-> Đã tạo 8 Tags.\n";

    // -------------------------------------------------------------
    // 4. DANH SÁCH SÁCH THỰC TẾ (PRODUCTS)
    // -------------------------------------------------------------
    echo "4. Đang cập nhật Sản phẩm Sách...\n";
    DB::table('product_translations')->truncate();
    DB::table('products')->truncate();

    $books = [
        [
            'name_vi' => 'Đắc Nhân Tâm',
            'name_en' => 'How to Win Friends and Influence People',
            'slug' => 'dac-nhan-tam',
            'sku' => 'DLF-KN-001',
            'price' => 86000,
            'special_price' => 68000,
            'brand' => 'first-news',
            'parent_cat' => 'sach-ky-nang-song',
            'sub_cat' => 'ky-nang-giao-tiep',
            'tags' => ['ky-nang-song', 'ban-chay-nhat', 'phat-trien-ban-than'],
            'short_desc_vi' => 'Cuốn sách kinh điển nghệ thuật thu phục lòng người của Dale Carnegie.',
            'short_desc_en' => 'Dale Carnegie classic masterpiece on interpersonal relationships.',
            'desc_vi' => 'Đắc Nhân Tâm là tác phẩm kinh điển nhất mọi thời đại về nghệ thuật giao tiếp và đối nhân xử thế. Tác phẩm đã giúp hàng triệu người trên thế giới thay đổi cuộc sống và thành công trong sự nghiệp.',
            'desc_en' => 'The premier book on building better interpersonal communication and lasting success in life and work.',
        ],
        [
            'name_vi' => 'Nhà Giả Kim',
            'name_en' => 'The Alchemist',
            'slug' => 'nha-gia-kim',
            'sku' => 'DLF-VH-001',
            'price' => 79000,
            'special_price' => 65000,
            'brand' => 'nha-nam',
            'parent_cat' => 'sach-van-hoc',
            'sub_cat' => 'tieu-thuyet',
            'tags' => ['sach-van-hoc', 'ban-chay-nhat'],
            'short_desc_vi' => 'Hành trình đi tìm kho báu và sứ mệnh cuộc đời của chàng trai chăn cừu Santiago.',
            'short_desc_en' => 'The unforgettable journey of Santiago pursuing his personal legend.',
            'desc_vi' => 'Nhà Giả Kim là cuốn sách bán chạy chỉ sau Kinh Thánh. Cuốn sách là nguồn cảm hứng sâu sắc về việc kiên định theo đuổi ước mơ và lắng nghe tiếng nói từ trái tim.',
            'desc_en' => 'A magical story of Santiago pursuing his dreams across the Egyptian desert.',
        ],
        [
            'name_vi' => 'Cây Cam Ngọt Của Tôi',
            'name_en' => 'My Sweet Orange Tree',
            'slug' => 'cay-cam-ngot-cua-toi',
            'sku' => 'DLF-VH-002',
            'price' => 85000,
            'special_price' => null,
            'brand' => 'nha-nam',
            'parent_cat' => 'sach-van-hoc',
            'sub_cat' => 'tieu-thuyet',
            'tags' => ['sach-van-hoc', 'ban-chay-nhat'],
            'short_desc_vi' => 'Câu chuyện cảm động lấy đi nước mắt của hàng triệu độc giả về cậu bé Zezé.',
            'short_desc_en' => 'A touching and heartwarming story about young Zezé.',
            'desc_vi' => 'Tác phẩm tự truyện nổi tiếng của José Mauro de Vasconcelos về tình yêu thương, sự dịu dàng và nỗi đau tuổi thơ sâu sắc.',
            'desc_en' => 'The internationally acclaimed semi-autobiographical novel touching on innocence and resilience.',
        ],
        [
            'name_vi' => 'Nghĩ Giàu Làm Giàu',
            'name_en' => 'Think and Grow Rich',
            'slug' => 'nghi-giau-lam-giau',
            'sku' => 'DLF-KT-001',
            'price' => 95000,
            'special_price' => 79000,
            'brand' => 'first-news',
            'parent_cat' => 'sach-kinh-te',
            'sub_cat' => 'khoi-nghiep-lam-giau',
            'tags' => ['sach-kinh-te', 'ban-chay-nhat', 'phat-trien-ban-than'],
            'short_desc_vi' => '13 nguyên tắc vàng tạo dựng của cải và thành công của Napoleon Hill.',
            'short_desc_en' => '13 proven principles for building wealth and personal achievement.',
            'desc_vi' => 'Cuốn sách đúc kết kinh nghiệm từ hơn 500 người thành công nhất nước Mỹ như Thomas Edison, Henry Ford.',
            'desc_en' => 'Napoleon Hill timeless philosophy based on interviews with over 500 successful leaders.',
        ],
        [
            'name_vi' => 'Cha Giàu Cha Nghèo (Tập 1)',
            'name_en' => 'Rich Dad Poor Dad',
            'slug' => 'cha-giau-cha-ngheo',
            'sku' => 'DLF-KT-002',
            'price' => 110000,
            'special_price' => 90000,
            'brand' => 'nxb-tre',
            'parent_cat' => 'sach-kinh-te',
            'sub_cat' => 'tai-chinh-dau-tu',
            'tags' => ['sach-kinh-te', 'ban-chay-nhat'],
            'short_desc_vi' => 'Bí mật tư duy tài chính cá nhân khác biệt giữa người giàu và người nghèo.',
            'short_desc_en' => 'Financial literacy lessons from the rich and poor fathers.',
            'desc_vi' => 'Robert Kiyosaki chỉ ra sự khác biệt căn bản giữa tài sản và tiêu sản, giúp người đọc làm chủ đồng tiền.',
            'desc_en' => 'The number one personal finance book of all time by Robert Kiyosaki.',
        ],
        [
            'name_vi' => 'Sapiens: Lược Sử Loài Người',
            'name_en' => 'Sapiens: A Brief History of Humankind',
            'slug' => 'sapiens-luoc-su-loai-nguoi',
            'sku' => 'DLF-LS-001',
            'price' => 189000,
            'special_price' => 159000,
            'brand' => 'omega-plus',
            'parent_cat' => 'sach-lich-su-triet-hoc',
            'sub_cat' => 'lich-su-the-gioi',
            'tags' => ['ban-chay-nhat', 'sach-moi'],
            'short_desc_vi' => 'Kiệt tác giải mã toàn bộ tiến trình lịch sử nhân loại từ đồ đá đến thời hiện đại.',
            'short_desc_en' => 'Yuval Noah Harari brilliant history of human evolution and culture.',
            'desc_vi' => 'Yuval Noah Harari dẫn dắt người đọc qua các cuộc cách mạng nhận thức, nông nghiệp và khoa học đã định hình nên nền văn minh con người.',
            'desc_en' => 'An engaging survey of humankind history from prehistoric apes to rulers of the world.',
        ],
        [
            'name_vi' => 'Hiểu Về Trái Tim',
            'name_en' => 'Understanding the Heart',
            'slug' => 'hieu-ve-trai-tim',
            'sku' => 'DLF-TL-001',
            'price' => 125000,
            'special_price' => 105000,
            'brand' => 'first-news',
            'parent_cat' => 'sach-tam-ly-nuoi-day-con',
            'sub_cat' => 'tam-ly-hoc-ung-dung',
            'tags' => ['ban-chay-nhat', 'phat-trien-ban-than'],
            'short_desc_vi' => 'Nghệ thuật chữa lành tâm hồn và tìm lại an yên trong cuộc sống của Thiền sư Minh Niệm.',
            'short_desc_en' => 'Healing the mind and finding inner peace by Zen Master Minh Niem.',
            'desc_vi' => 'Tác phẩm đưa ra 50 bài học tâm lý sâu sắc giúp soi chiếu bản thân, buông bỏ muộn phiền và vun đắp tình yêu thương.',
            'desc_en' => 'Deep insights into human emotions and practical guidance for mindfulness.',
        ],
        [
            'name_vi' => 'Rừng Na Uy',
            'name_en' => 'Norwegian Wood',
            'slug' => 'rung-na-uy',
            'sku' => 'DLF-VH-003',
            'price' => 115000,
            'special_price' => null,
            'brand' => 'nha-nam',
            'parent_cat' => 'sach-van-hoc',
            'sub_cat' => 'tieu-thuyet',
            'tags' => ['sach-van-hoc'],
            'short_desc_vi' => 'Tiểu thuyết lãng mạn hoài niệm đầy day dứt của Haruki Murakami.',
            'short_desc_en' => 'The celebrated novel of youth, loss, and growing up by Haruki Murakami.',
            'desc_vi' => 'Rừng Na Uy là câu chuyện hoài niệm sâu lắng về tuổi trẻ, tình yêu, mất mát và những trăn trở của những người trẻ tuổi tại Tokyo thập niên 60.',
            'desc_en' => 'A nostalgic story of loss and burgeoning sexuality in 1960s Tokyo.',
        ],
        [
            'name_vi' => 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
            'name_en' => 'How Much Is Your Youth Worth',
            'slug' => 'tuoi-tre-dang-gia-bao-nhieu',
            'sku' => 'DLF-KN-002',
            'price' => 75000,
            'special_price' => 60000,
            'brand' => 'nha-nam',
            'parent_cat' => 'sach-ky-nang-song',
            'sub_cat' => 'phat-trien-ban-than',
            'tags' => ['ky-nang-song', 'phat-trien-ban-than'],
            'short_desc_vi' => 'Kim chỉ nam truyền cảm hứng rực rỡ cho thanh xuân và tuổi trẻ của Rosie Nguyễn.',
            'short_desc_en' => 'Inspirational guidebook for youth by Rosie Nguyen.',
            'desc_vi' => 'Sách chia sẻ trải nghiệm thực tế về việc học tập, làm việc và khám phá thế giới để không lãng phí những năm tháng tuổi trẻ quý giá.',
            'desc_en' => 'Encouraging lessons on continuous self-learning and purposeful living.',
        ],
        [
            'name_vi' => '7 Thói Quen Của Người Thành Đạt',
            'name_en' => 'The 7 Habits of Highly Effective People',
            'slug' => '7-thoi-quen-thanh-dat',
            'sku' => 'DLF-KN-003',
            'price' => 135000,
            'special_price' => 115000,
            'brand' => 'first-news',
            'parent_cat' => 'sach-ky-nang-song',
            'sub_cat' => 'phat-trien-ban-than',
            'tags' => ['ky-nang-song', 'ban-chay-nhat'],
            'short_desc_vi' => 'Hệ thống nguyên tắc nền tảng xây dựng năng lực hiệu quả vượt trội của Stephen Covey.',
            'short_desc_en' => 'Stephen Covey renowned principles for personal and professional effectiveness.',
            'desc_vi' => 'Cuốn sách cung cấp phương pháp tiếp cận toàn diện để giải quyết vấn đề cá nhân và nghề nghiệp dựa trên các nguyên tắc bất biến.',
            'desc_en' => 'One of the most inspiring and impactful books ever written on leadership and character.',
        ],
        [
            'name_vi' => 'Mắt Biếc',
            'name_en' => 'Blue Eyes',
            'slug' => 'mat-biec',
            'sku' => 'DLF-VH-004',
            'price' => 90000,
            'special_price' => null,
            'brand' => 'nxb-tre',
            'parent_cat' => 'sach-van-hoc',
            'sub_cat' => 'truyen-ngan-tan-van',
            'tags' => ['sach-van-hoc', 'ban-chay-nhat'],
            'short_desc_vi' => 'Tác phẩm văn học trong sáng và da diết nhất của nhà văn Nguyễn Nhật Ánh.',
            'short_desc_en' => 'Nguyen Nhat Anh poignant novel of unrequited childhood love.',
            'desc_vi' => 'Câu chuyện tình đẹp mà buồn giữa Ngạn và Hà Lan ở làng Đo Đo, khơi gợi ký ức tuổi thơ trong trẻo.',
            'desc_en' => 'A beautifully bittersweet story of youthful longing and lifelong devotion.',
        ],
        [
            'name_vi' => 'Bố Già (The Godfather)',
            'name_en' => 'The Godfather',
            'slug' => 'bo-gia-godfather',
            'sku' => 'DLF-VH-005',
            'price' => 140000,
            'special_price' => 120000,
            'brand' => 'nha-nam',
            'parent_cat' => 'sach-van-hoc',
            'sub_cat' => 'van-hoc-co-dien',
            'tags' => ['sach-van-hoc', 'ban-chay-nhat'],
            'short_desc_vi' => 'Bản anh hùng ca về thế giới ngầm Mafia và tình cảm gia đình của Mario Puzo.',
            'short_desc_en' => 'Mario Puzo epic masterpiece on the Corleone family.',
            'desc_vi' => 'Tác phẩm lột tả chân thực thế giới mafia nước Mỹ cùng những triết lý sống, danh dự và lòng trung thành gia tộc sâu sắc.',
            'desc_en' => 'The definitive epic of crime and honor that captivated millions.',
        ],
        [
            'name_vi' => 'Dế Mèn Phiêu Lưu Ký',
            'name_en' => 'Diary of a Cricket',
            'slug' => 'de-men-phieu-luu-ky',
            'sku' => 'DLF-TN-001',
            'price' => 50000,
            'special_price' => null,
            'brand' => 'nxb-kim-dong',
            'parent_cat' => 'sach-thieu-nhi',
            'sub_cat' => 'truyen-tranh-thieu-nhi',
            'tags' => ['sach-thieu-nhi'],
            'short_desc_vi' => 'Tác phẩm kinh điển của nhà văn Tô Hoài gắn liền với tuổi thơ bao thế hệ.',
            'short_desc_en' => 'Classic children literature journey by To Hoai.',
            'desc_vi' => 'Những chuyến phiêu lưu kỳ thú của chú Dế Mèn dũng cảm trên hành trình kết bạn và bảo vệ chính nghĩa.',
            'desc_en' => 'The adventurous adventures of a lively cricket learning friendship and justice.',
        ],
        [
            'name_vi' => 'Quẳng Gánh Lo Đi Và Vui Sống',
            'name_en' => 'How to Stop Worrying and Start Living',
            'slug' => 'quang-ganh-lo-di-va-vui-song',
            'sku' => 'DLF-KN-004',
            'price' => 82000,
            'special_price' => 69000,
            'brand' => 'first-news',
            'parent_cat' => 'sach-ky-nang-song',
            'sub_cat' => 'tu-duy-tich-cuc',
            'tags' => ['ky-nang-song', 'phat-trien-ban-than'],
            'short_desc_vi' => 'Bí quyết xua tan âu lo, căng thẳng để tận hưởng trọn vẹn từng khoảnh khắc cuộc sống.',
            'short_desc_en' => 'Practical advice by Dale Carnegie on overcoming worry.',
            'desc_vi' => 'Sách cung cấp các phương pháp thực tiễn giúp bạn chế ngự sự sợ hãi, lo âu và xây dựng tinh thần lạc quan.',
            'desc_en' => 'Actionable formulas to conquer anxiety and lead a happier, calmer life.',
        ],
        [
            'name_vi' => 'Từ Tốt Đến Vĩ Đại',
            'name_en' => 'Good to Great',
            'slug' => 'tu-tot-den-vi-dai',
            'sku' => 'DLF-KT-003',
            'price' => 155000,
            'special_price' => 135000,
            'brand' => 'alpha-books',
            'parent_cat' => 'sach-kinh-te',
            'sub_cat' => 'quan-tri-lanh-dao',
            'tags' => ['sach-kinh-te'],
            'short_desc_vi' => 'Nghiên cứu đột phá về lý do tại sao một số công ty tạo nên bước nhảy vọt vượt bậc.',
            'short_desc_en' => 'Jim Collins rigorous study on corporate greatness.',
            'desc_vi' => 'Jim Collins và đội ngũ nghiên cứu đưa ra các khái niệm như Lãnh đạo cấp độ 5, Khái niệm con nhím giúp doanh nghiệp vươn tầm xuất chúng.',
            'desc_en' => 'Insights into how mediocre companies achieve sustained extraordinary performance.',
        ],
        [
            'name_vi' => 'Tâm Lý Học Tội Phạm',
            'name_en' => 'Criminal Psychology',
            'slug' => 'tam-ly-hoc-toi-pham',
            'sku' => 'DLF-TL-002',
            'price' => 130000,
            'special_price' => null,
            'brand' => 'nha-nam',
            'parent_cat' => 'sach-tam-ly-nuoi-day-con',
            'sub_cat' => 'tam-ly-hoc-ung-dung',
            'tags' => ['sach-moi'],
            'short_desc_vi' => 'Khám phá thế giới nội tâm u tối và hành vi tội phạm qua lăng kính khoa học.',
            'short_desc_en' => 'Exploration of criminal behavior and motives through psychology.',
            'desc_vi' => 'Phân tích các vụ án có thật và nguyên nhân tâm lý học đằng sau các hành vi phạm tội tinh vi.',
            'desc_en' => 'Fascinating case analyses uncovering cognitive patterns behind deviant acts.',
        ],
        [
            'name_vi' => 'Đại Việt Sử Ký Toàn Thư',
            'name_en' => 'Complete Annals of Dai Viet',
            'slug' => 'dai-viet-su-ky-toan-thu',
            'sku' => 'DLF-LS-002',
            'price' => 260000,
            'special_price' => 220000,
            'brand' => 'nxb-tong-hop',
            'parent_cat' => 'sach-lich-su-triet-hoc',
            'sub_cat' => 'lich-su-viet-nam',
            'tags' => ['sach-moi'],
            'short_desc_vi' => 'Bộ quốc sử đồ sộ vô giá ghi chép toàn diện lịch sử nước ta từ thời Hồng Bàng.',
            'short_desc_en' => 'The monumental comprehensive historical chronicle of Vietnam.',
            'desc_vi' => 'Công trình lịch sử giá trị bậc nhất của sử gia Ngô Sĩ Liên và các sử quan triều Hậu Lê biên soạn.',
            'desc_en' => 'Essential cultural and historical treasure documenting centuries of Vietnamese history.',
        ],
        [
            'name_vi' => 'Vũ Trụ Trong Vỏ Hạt Dẻ',
            'name_en' => 'The Universe in a Nutshell',
            'slug' => 'vu-tru-trong-vo-hat-de',
            'sku' => 'DLF-KH-001',
            'price' => 145000,
            'special_price' => 125000,
            'brand' => 'nxb-tre',
            'parent_cat' => 'khoa-hoc-cong-nghe',
            'sub_cat' => 'khoa-hoc-vu-tru',
            'tags' => ['sach-moi'],
            'short_desc_vi' => 'Hành trình khám phá các bí ẩn không-thời gian của thiên tài Stephen Hawking.',
            'short_desc_en' => 'Stephen Hawking guide to the frontiers of theoretical physics.',
            'desc_vi' => 'Stephen Hawking giải thích lý thuyết lượng tử, lỗ đen, thuyết tương đối và bức tranh toàn cảnh vũ trụ bằng ngôn ngữ gần gũi.',
            'desc_en' => 'A visually rich guide through M-theory, black holes, and the fate of the universe.',
        ],
        [
            'name_vi' => 'Clean Code: Mã Sạch',
            'name_en' => 'Clean Code: A Handbook of Agile Software Craftsmanship',
            'slug' => 'clean-code-ma-sach',
            'sku' => 'DLF-KH-002',
            'price' => 215000,
            'special_price' => 189000,
            'brand' => 'alpha-books',
            'parent_cat' => 'khoa-hoc-cong-nghe',
            'sub_cat' => 'lap-trinh-cntt',
            'tags' => ['sach-moi'],
            'short_desc_vi' => 'Cẩm nang kinh điển về kỹ năng viết code sạch và tối ưu của Robert C. Martin.',
            'short_desc_en' => 'Robert C. Martin guide to professional code craftsmanship.',
            'desc_vi' => 'Cuốn sách gối đầu giường của mọi kỹ sư phần mềm giúp nâng cao tư duy thiết kế, refactor và bảo trì mã nguồn chuẩn.',
            'desc_en' => 'Even bad code can function, but clean code makes software robust, scalable, and elegant.',
        ],
        [
            'name_vi' => 'Luyện Thi IELTS 7.5+ Toàn Diện',
            'name_en' => 'Complete IELTS 7.5+ Preparation Guide',
            'slug' => 'luyen-thi-ielts-toan-dien',
            'sku' => 'DLF-NN-001',
            'price' => 168000,
            'special_price' => 145000,
            'brand' => 'nxb-tong-hop',
            'parent_cat' => 'sach-ngoai-ngu',
            'sub_cat' => 'luyen-thi-ielts-toeic',
            'tags' => ['sach-moi'],
            'short_desc_vi' => 'Chiến lược bứt phá 4 kỹ năng Nghe - Nói - Đọc - Viết đạt band điểm mơ ước.',
            'short_desc_en' => 'Comprehensive 4-skills preparation guide for IELTS 7.5+ achievement.',
            'desc_vi' => 'Tổng hợp các dạng bài thi thực chiến, mẹo xử lý bẫy đề thi và bộ từ vựng Academic điểm cao.',
            'desc_en' => 'Detailed strategies, practice tests, and high-band vocabulary for IELTS candidates.',
        ],
        [
            'name_vi' => 'Vô Cùng Tàn Nhẫn Vô Cùng Yêu Thương',
            'name_en' => 'Tough Love: Jewish Parenting Wisdom',
            'slug' => 'vo-cung-tan-nhan-vo-cung-yeu-thuong',
            'sku' => 'DLF-TL-003',
            'price' => 118000,
            'special_price' => 99000,
            'brand' => 'first-news',
            'parent_cat' => 'sach-tam-ly-nuoi-day-con',
            'sub_cat' => 'nuoi-day-con',
            'tags' => ['ban-chay-nhat'],
            'short_desc_vi' => 'Phương pháp giáo dục con độc đáo của người Do Thái giúp con tự lập và bản lĩnh.',
            'short_desc_en' => 'Jewish wisdom for raising independent, resilient children.',
            'desc_vi' => 'Tác giả Sara Imas chia sẻ nghệ thuật nuôi dạy con: yêu thương có nguyên tắc, rèn luyện tính tự lập từ sớm.',
            'desc_en' => 'A unique perspective on blending cultural traditions to nurture competent children.',
        ],
        [
            'name_vi' => 'Hoàng Tử Bé',
            'name_en' => 'The Little Prince',
            'slug' => 'hoang-tu-be',
            'sku' => 'DLF-TN-002',
            'price' => 68000,
            'special_price' => null,
            'brand' => 'nxb-kim-dong',
            'parent_cat' => 'sach-thieu-nhi',
            'sub_cat' => 'co-tich-than-thoai',
            'tags' => ['sach-thieu-nhi', 'ban-chay-nhat'],
            'short_desc_vi' => 'Câu chuyện ngụ ngôn tuyệt đẹp về tình bạn, lòng bao dung và cái nhìn thuần khiết.',
            'short_desc_en' => 'Antoine de Saint-Exupéry timeless philosophical fairy tale.',
            'desc_vi' => 'Tác phẩm dịch ra hơn 300 ngôn ngữ, chạm đến trái tim cả trẻ nhỏ lẫn người lớn về ý nghĩa cuộc đời.',
            'desc_en' => 'One sees clearly only with the heart; what is essential is invisible to the eye.',
        ],
        [
            'name_vi' => 'Marketing Giỏi Phải Kiếm Được Tiền',
            'name_en' => 'Smart Marketing Generates Revenue',
            'slug' => 'marketing-gioi-phai-kiem-duoc-tien',
            'sku' => 'DLF-KT-004',
            'price' => 128000,
            'special_price' => 109000,
            'brand' => 'alpha-books',
            'parent_cat' => 'sach-kinh-te',
            'sub_cat' => 'marketing-ban-hang',
            'tags' => ['sach-kinh-te'],
            'short_desc_vi' => 'Cựu giám đốc Marketing Coca-Cola chia sẻ tư duy marketing gắn liền doanh số.',
            'short_desc_en' => 'Ex-Coca Cola CMO Sergio Zyman on outcome-driven marketing.',
            'desc_vi' => 'Tác phẩm vạch rõ bản chất của tiếp thị hiện đại: tiếp thị không chỉ để giải thưởng mà là để bán được nhiều hàng hơn cho nhiều người hơn.',
            'desc_en' => 'Hard-hitting truths about making marketing an accountable revenue generator.',
        ],
        [
            'name_vi' => 'Tư Duy Nhanh Và Chậm',
            'name_en' => 'Thinking, Fast and Slow',
            'slug' => 'tu-duy-nhanh-va-cham',
            'sku' => 'DLF-KT-005',
            'price' => 175000,
            'special_price' => 149000,
            'brand' => 'alpha-books',
            'parent_cat' => 'sach-kinh-te',
            'sub_cat' => 'kinh-te-hoc',
            'tags' => ['sach-kinh-te', 'phat-trien-ban-than'],
            'short_desc_vi' => 'Công trình Nobel kinh tế học của Daniel Kahneman giải mã hai hệ thống tư duy con người.',
            'short_desc_en' => 'Nobel Laureate Daniel Kahneman groundbreaking tour of the human mind.',
            'desc_vi' => 'Phân tích hệ thống tư duy 1 (nhanh, bản năng) và hệ thống 2 (chậm, logic) ảnh hưởng đến mọi quyết định tài chính và cuộc sống.',
            'desc_en' => 'A monumental work explaining cognitive biases and how we make choices under uncertainty.',
        ]
    ];

    $productIds = [];
    foreach ($books as $b) {
        $pId = DB::table('products')->insertGetId([
            'brand_id' => $brandMap[$b['brand']] ?? null,
            'tax_class_id' => null,
            'slug' => $b['slug'],
            'price' => $b['price'],
            'special_price' => $b['special_price'],
            'special_price_type' => $b['special_price'] ? 'fixed' : null,
            'selling_price' => $b['special_price'] ?: $b['price'],
            'sku' => $b['sku'],
            'manage_stock' => 1,
            'qty' => 100,
            'in_stock' => 1,
            'is_virtual' => 0,
            'is_active' => 1,
            'new_from' => now()->subDays(5),
            'new_to' => now()->addDays(30),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('product_translations')->insert([
            [
                'product_id' => $pId,
                'locale' => 'vi',
                'name' => $b['name_vi'],
                'short_description' => $b['short_desc_vi'],
                'description' => $b['desc_vi']
            ],
            [
                'product_id' => $pId,
                'locale' => 'en',
                'name' => $b['name_en'],
                'short_description' => $b['short_desc_en'],
                'description' => $b['desc_en']
            ],
        ]);

        // Gắn danh mục cha và con
        if (isset($categoryMap[$b['parent_cat']])) {
            DB::table('product_categories')->insert([
                'product_id' => $pId,
                'category_id' => $categoryMap[$b['parent_cat']],
            ]);
        }
        if (isset($categoryMap[$b['sub_cat']])) {
            DB::table('product_categories')->insert([
                'product_id' => $pId,
                'category_id' => $categoryMap[$b['sub_cat']],
            ]);
        }

        // Gắn tags
        foreach ($b['tags'] as $tSlug) {
            if (isset($tagMap[$tSlug])) {
                DB::table('product_tags')->insert([
                    'product_id' => $pId,
                    'tag_id' => $tagMap[$tSlug],
                ]);
            }
        }

        $productIds[] = $pId;
    }
    echo "-> Đã tạo " . count($productIds) . " đầu sách vào database.\n";

    // -------------------------------------------------------------
    // 5. CÁC TRANG CHÍNH SÁCH / BẢO MẬT / FAQ (PAGES)
    // -------------------------------------------------------------
    echo "5. Đang cập nhật Các trang chính sách (Pages)...\n";
    DB::table('page_translations')->truncate();
    DB::table('pages')->truncate();

    $pages = [
        [
            'slug' => 'return-policy',
            'name_vi' => 'Chính sách đổi trả',
            'name_en' => 'Return Policy',
            'body_vi' => '<p>DalifaBooks cam kết mang đến sự hài lòng tối đa cho quý khách hàng. Quý khách được đổi trả miễn phí trong vòng 7 ngày kể từ ngày nhận sách nếu sách bị lỗi do in ấn, gáy hỏng hoặc hư hỏng trong quá trình vận chuyển.</p>',
            'body_en' => '<p>DalifaBooks offers an easy 7-day return policy for any damaged or defective items with full reimbursement or immediate replacement.</p>',
        ],
        [
            'slug' => 'faq',
            'name_vi' => 'Câu hỏi thường gặp',
            'name_en' => 'FAQ',
            'body_vi' => '<p><strong>1. Thời gian giao hàng là bao lâu?</strong><br>Thời gian giao hàng từ 1-2 ngày đối với nội thành và 2-4 ngày đối với các tỉnh thành khác.<br><strong>2. Tôi có được kiểm tra sách trước khi nhận không?</strong><br>Quý khách hoàn toàn được đồng kiểm sách khi thanh toán tiền mặt (COD).</p>',
            'body_en' => '<p><strong>1. How long is delivery?</strong><br>Delivery typically takes 1-2 business days locally and 2-4 days nationally.<br><strong>2. Can I check goods on arrival?</strong><br>Yes, COD inspection is fully supported.</p>',
        ],
        [
            'slug' => 'privacy-policy',
            'name_vi' => 'Chính sách bảo mật',
            'name_en' => 'Privacy & Policy',
            'body_vi' => '<p>DalifaBooks tôn trọng và cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng theo quy định pháp luật. Chúng tôi không bao giờ chia sẻ thông tin cho bất kỳ bên thứ ba nào vì mục đích thương mại.</p>',
            'body_en' => '<p>DalifaBooks strictly respects customer privacy and ensures that personal information is protected with state-of-the-art security practices.</p>',
        ],
        [
            'slug' => 'terms-of-use',
            'name_vi' => 'Điều khoản sử dụng',
            'name_en' => 'Terms Of Use',
            'body_vi' => '<p>Chào mừng bạn đến với DalifaBooks. Khi sử dụng website của chúng tôi, bạn đồng ý tuân thủ các điều khoản dịch vụ và chính sách giao dịch thương mại điện tử.</p>',
            'body_en' => '<p>Welcome to DalifaBooks. By using this service, you agree to comply with our general terms of service.</p>',
        ],
    ];

    $pageMap = [];
    foreach ($pages as $p) {
        $pId = DB::table('pages')->insertGetId([
            'slug' => $p['slug'],
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('page_translations')->insert([
            ['page_id' => $pId, 'locale' => 'vi', 'name' => $p['name_vi'], 'body' => $p['body_vi']],
            ['page_id' => $pId, 'locale' => 'en', 'name' => $p['name_en'], 'body' => $p['body_en']],
        ]);
        $pageMap[$p['slug']] = $pId;
    }
    echo "-> Đã tạo 4 trang nội dung.\n";

    // -------------------------------------------------------------
    // 6. TẠO MENU FOOTER & HEADER (MENUS & MENU ITEMS)
    // -------------------------------------------------------------
    echo "6. Đang cập nhật Menu Header và Footer...\n";
    DB::table('menu_item_translations')->truncate();
    DB::table('menu_items')->truncate();
    DB::table('menu_translations')->truncate();
    DB::table('menus')->truncate();

    // Menu 1: Dịch vụ của chúng tôi / Our Services (Footer Cột 3)
    $menu1Id = DB::table('menus')->insertGetId(['is_active' => 1, 'created_at' => now(), 'updated_at' => now()]);
    DB::table('menu_translations')->insert([
        ['menu_id' => $menu1Id, 'locale' => 'vi', 'name' => 'Dịch vụ của chúng tôi'],
        ['menu_id' => $menu1Id, 'locale' => 'en', 'name' => 'Our Services'],
    ]);
    $menu1Items = [
        ['name_vi' => 'Chính sách đổi trả', 'name_en' => 'Return Policy', 'page_id' => $pageMap['return-policy'], 'type' => 'page'],
        ['name_vi' => 'Câu hỏi thường gặp', 'name_en' => 'FAQ', 'page_id' => $pageMap['faq'], 'type' => 'page'],
        ['name_vi' => 'Chính sách bảo mật', 'name_en' => 'Privacy & Policy', 'page_id' => $pageMap['privacy-policy'], 'type' => 'page'],
        ['name_vi' => 'Điều khoản sử dụng', 'name_en' => 'Terms Of Use', 'page_id' => $pageMap['terms-of-use'], 'type' => 'page'],
    ];
    $pos = 1;
    foreach ($menu1Items as $item) {
        $miId = DB::table('menu_items')->insertGetId([
            'menu_id' => $menu1Id,
            'page_id' => $item['page_id'],
            'type' => 'page',
            'target' => '_self',
            'position' => $pos++,
            'is_root' => 0,
            'is_fluid' => 0,
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('menu_item_translations')->insert([
            ['menu_item_id' => $miId, 'locale' => 'vi', 'name' => $item['name_vi']],
            ['menu_item_id' => $miId, 'locale' => 'en', 'name' => $item['name_en']],
        ]);
    }

    // Menu 2: Thông tin / Information (Footer Cột 4)
    $menu2Id = DB::table('menus')->insertGetId(['is_active' => 1, 'created_at' => now(), 'updated_at' => now()]);
    DB::table('menu_translations')->insert([
        ['menu_id' => $menu2Id, 'locale' => 'vi', 'name' => 'Thông tin'],
        ['menu_id' => $menu2Id, 'locale' => 'en', 'name' => 'Information'],
    ]);
    $menu2Items = [
        ['name_vi' => 'Sách mới phát hành', 'name_en' => 'New Arrivals', 'url' => '/products?sort=latest'],
        ['name_vi' => 'Sách bán chạy', 'name_en' => 'Specials', 'url' => '/products?sort=popular'],
        ['name_vi' => 'Khuyến mãi hot', 'name_en' => 'Hot Deals', 'url' => '/products'],
        ['name_vi' => 'Tác phẩm kinh điển', 'name_en' => 'Classics', 'url' => '/categories/sach-van-hoc'],
        ['name_vi' => 'Tác giả nổi bật', 'name_en' => 'Authors', 'url' => '/products'],
    ];
    $pos = 1;
    foreach ($menu2Items as $item) {
        $miId = DB::table('menu_items')->insertGetId([
            'menu_id' => $menu2Id,
            'type' => 'url',
            'url' => $item['url'],
            'target' => '_self',
            'position' => $pos++,
            'is_root' => 0,
            'is_fluid' => 0,
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('menu_item_translations')->insert([
            ['menu_item_id' => $miId, 'locale' => 'vi', 'name' => $item['name_vi']],
            ['menu_item_id' => $miId, 'locale' => 'en', 'name' => $item['name_en']],
        ]);
    }

    // Menu 3: Primary Header Menu (Trang chủ, Tất cả sách, ...)
    $menu3Id = DB::table('menus')->insertGetId(['is_active' => 1, 'created_at' => now(), 'updated_at' => now()]);
    DB::table('menu_translations')->insert([
        ['menu_id' => $menu3Id, 'locale' => 'vi', 'name' => 'Menu Chính'],
        ['menu_id' => $menu3Id, 'locale' => 'en', 'name' => 'Primary Menu'],
    ]);
    $menu3Items = [
        ['name_vi' => 'Trang chủ', 'name_en' => 'Home', 'url' => '/'],
        ['name_vi' => 'Tất cả sách', 'name_en' => 'All Books', 'url' => '/products'],
        ['name_vi' => 'Sách mới', 'name_en' => 'New Books', 'url' => '/products?sort=latest'],
        ['name_vi' => 'Bán chạy', 'name_en' => 'Best Sellers', 'url' => '/products?sort=popular'],
        ['name_vi' => 'Khuyến mãi', 'name_en' => 'Promotions', 'url' => '/products'],
        ['name_vi' => 'Liên hệ', 'name_en' => 'Contact', 'url' => '/contact'],
    ];
    $pos = 1;
    foreach ($menu3Items as $item) {
        $miId = DB::table('menu_items')->insertGetId([
            'menu_id' => $menu3Id,
            'type' => 'url',
            'url' => $item['url'],
            'target' => '_self',
            'position' => $pos++,
            'is_root' => 0,
            'is_fluid' => 0,
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('menu_item_translations')->insert([
            ['menu_item_id' => $miId, 'locale' => 'vi', 'name' => $item['name_vi']],
            ['menu_item_id' => $miId, 'locale' => 'en', 'name' => $item['name_en']],
        ]);
    }

    // Menu 4: Category Mega Menu (Tất cả danh mục sách - 2 CẤP ĐẦY ĐỦ)
    $menu4Id = DB::table('menus')->insertGetId(['is_active' => 1, 'created_at' => now(), 'updated_at' => now()]);
    DB::table('menu_translations')->insert([
        ['menu_id' => $menu4Id, 'locale' => 'vi', 'name' => 'Danh mục sản phẩm'],
        ['menu_id' => $menu4Id, 'locale' => 'en', 'name' => 'Category Menu'],
    ]);

    $pPos = 1;
    foreach ($categoryHierarchy as $parentData) {
        $pCatId = $categoryMap[$parentData['slug']];
        $parentMenuItemId = DB::table('menu_items')->insertGetId([
            'menu_id' => $menu4Id,
            'category_id' => $pCatId,
            'type' => 'category',
            'target' => '_self',
            'position' => $pPos++,
            'is_root' => 0,
            'is_fluid' => 0,
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('menu_item_translations')->insert([
            ['menu_item_id' => $parentMenuItemId, 'locale' => 'vi', 'name' => $parentData['name_vi']],
            ['menu_item_id' => $parentMenuItemId, 'locale' => 'en', 'name' => $parentData['name_en']],
        ]);

        $cPos = 1;
        foreach ($parentData['children'] as $childData) {
            $cCatId = $categoryMap[$childData['slug']];
            $childMenuItemId = DB::table('menu_items')->insertGetId([
                'menu_id' => $menu4Id,
                'parent_id' => $parentMenuItemId,
                'category_id' => $cCatId,
                'type' => 'category',
                'target' => '_self',
                'position' => $cPos++,
                'is_root' => 0,
                'is_fluid' => 0,
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::table('menu_item_translations')->insert([
                ['menu_item_id' => $childMenuItemId, 'locale' => 'vi', 'name' => $childData['name_vi']],
                ['menu_item_id' => $childMenuItemId, 'locale' => 'en', 'name' => $childData['name_en']],
            ]);
        }
    }
    echo "-> Đã tạo 4 Menus (Menu Footer 1, Menu Footer 2, Menu Chính, Menu Danh mục 2 cấp).\n";

    // -------------------------------------------------------------
    // 7. FILE THANH TOÁN (ACCEPTED PAYMENT METHODS IMAGE)
    // -------------------------------------------------------------
    echo "7. Đang cập nhật File ảnh thanh toán...\n";
    $paymentFileId = DB::table('files')->insertGetId([
        'user_id' => 1,
        'filename' => 'accepted_payment_methods.svg',
        'disk' => 'public',
        'path' => 'media/accepted_payment_methods.svg',
        'extension' => 'svg',
        'mime' => 'image/svg+xml',
        'size' => 1520,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    // -------------------------------------------------------------
    // 8. CẬP NHẬT SETTINGS (FOOTER, CONTACT, SOCIAL, HOMEPAGE)
    // -------------------------------------------------------------
    echo "8. Đang cập nhật Settings cấu hình giao diện & Footer...\n";

    $settingsToUpdate = [
        'store_name' => serialize('DalifaBooks'),
        'store_tagline' => serialize('Hiệu Sách Trực Tuyến Hàng Đầu'),
        'store_phone' => serialize('+84 987 654 321'),
        'store_phone_hide' => serialize('0'),
        'store_email' => serialize('admin@dalifabooks.com'),
        'store_email_hide' => serialize('0'),
        'storefront_address' => serialize("Số 123 Phố Sách, Quận Hoàn Kiếm, Hà Nội"),
        'storefront_facebook_link' => serialize('https://facebook.com/dalifabooks'),
        'storefront_twitter_link' => serialize('https://twitter.com/dalifabooks'),
        'storefront_instagram_link' => serialize('https://instagram.com/dalifabooks'),
        'storefront_youtube_link' => serialize('https://youtube.com/@dalifabooks'),
        
        // Newsletter banner
        'newsletter_enabled' => serialize('1'),
        
        // Footer settings
        'storefront_footer_menu_one' => serialize((string)$menu1Id),
        'storefront_footer_menu_one_title' => serialize('Dịch vụ của chúng tôi'),
        'storefront_footer_menu_two' => serialize((string)$menu2Id),
        'storefront_footer_menu_two_title' => serialize('Thông tin'),
        'storefront_footer_tags' => serialize($tagIds),
        'storefront_copyright_text' => serialize('Copyright © <a href="{{ store_url }}">DalifaBooks</a> {{ year }}. All rights reserved.'),
        'storefront_accepted_payment_methods_image' => serialize((string)$paymentFileId),

        // Navigation
        'storefront_primary_menu' => serialize((string)$menu3Id),
        'storefront_category_menu' => serialize((string)$menu4Id),

        // Features Bar
        'storefront_features_section_enabled' => serialize('1'),
        'storefront_feature_1_icon' => serialize('las la-shipping-fast'),
        'storefront_feature_1_title' => serialize('Giao hàng toàn quốc'),
        'storefront_feature_1_subtitle' => serialize('Miễn phí đơn từ 250.000đ'),
        'storefront_feature_2_icon' => serialize('las la-certificate'),
        'storefront_feature_2_title' => serialize('100% Sách thật'),
        'storefront_feature_2_subtitle' => serialize('Cam kết chính hãng'),
        'storefront_feature_3_icon' => serialize('las la-sync-alt'),
        'storefront_feature_3_title' => serialize('Đổi trả dễ dàng'),
        'storefront_feature_3_subtitle' => serialize('Trong vòng 7 ngày'),
        'storefront_feature_4_icon' => serialize('las la-headset'),
        'storefront_feature_4_title' => serialize('Hỗ trợ 24/7'),
        'storefront_feature_4_subtitle' => serialize('Hotline: 0987 654 321'),
        'storefront_feature_5_icon' => serialize('las la-credit-card'),
        'storefront_feature_5_title' => serialize('Thanh toán tiện lợi'),
        'storefront_feature_5_subtitle' => serialize('COD & Thẻ ngân hàng'),

        // Featured Categories Section (hiển thị danh mục trên homepage)
        'storefront_featured_categories_section_enabled' => serialize('1'),
        'storefront_featured_categories_section_title' => serialize('Danh Mục Nổi Bật'),
        'storefront_featured_categories_section_subtitle' => serialize('Khám phá kho tàng tri thức đa dạng tại DalifaBooks'),
        'storefront_featured_categories_section_category_1_category_id' => serialize((string)$categoryMap['sach-van-hoc']),
        'storefront_featured_categories_section_category_2_category_id' => serialize((string)$categoryMap['sach-kinh-te']),
        'storefront_featured_categories_section_category_3_category_id' => serialize((string)$categoryMap['sach-ky-nang-song']),
        'storefront_featured_categories_section_category_4_category_id' => serialize((string)$categoryMap['sach-tam-ly-nuoi-day-con']),
        'storefront_featured_categories_section_category_5_category_id' => serialize((string)$categoryMap['sach-thieu-nhi']),
        'storefront_featured_categories_section_category_6_category_id' => serialize((string)$categoryMap['khoa-hoc-cong-nghe']),

        // Product Tabs 1 (Sách Mới, Bán Chạy, ...)
        'storefront_product_tabs_1_section_enabled' => serialize('1'),
        'storefront_product_tabs_1_section_title' => serialize('Sách Mới & Bán Chạy Nhất'),
        'storefront_product_tabs_1_section_tab_1_title' => serialize('Sách Nổi Bật'),
        'storefront_product_tabs_1_section_tab_1_product_type' => serialize('latest_products'),
        'storefront_product_tabs_1_section_tab_1_products_limit' => serialize('8'),
        'storefront_product_tabs_1_section_tab_2_title' => serialize('Văn Học Đặc Sắc'),
        'storefront_product_tabs_1_section_tab_2_product_type' => serialize('category_products'),
        'storefront_product_tabs_1_section_tab_2_category_id' => serialize((string)$categoryMap['sach-van-hoc']),
        'storefront_product_tabs_1_section_tab_2_products_limit' => serialize('8'),
        'storefront_product_tabs_1_section_tab_3_title' => serialize('Kinh Tế - Khởi Nghiệp'),
        'storefront_product_tabs_1_section_tab_3_product_type' => serialize('category_products'),
        'storefront_product_tabs_1_section_tab_3_category_id' => serialize((string)$categoryMap['sach-kinh-te']),
        'storefront_product_tabs_1_section_tab_3_products_limit' => serialize('8'),
        'storefront_product_tabs_1_section_tab_4_title' => serialize('Kỹ Năng Sống'),
        'storefront_product_tabs_1_section_tab_4_product_type' => serialize('category_products'),
        'storefront_product_tabs_1_section_tab_4_category_id' => serialize((string)$categoryMap['sach-ky-nang-song']),
        'storefront_product_tabs_1_section_tab_4_products_limit' => serialize('8'),
    ];

    foreach ($settingsToUpdate as $key => $serializedValue) {
        DB::table('settings')->updateOrInsert(
            ['key' => $key],
            [
                'is_translatable' => 0,
                'plain_value' => $serializedValue,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
    echo "-> Đã cập nhật xong toàn bộ Settings.\n";

    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    if (DB::transactionLevel() > 0) {
        DB::commit();
    }
    echo "=== HOÀN TẤT PUSH DỮ LIỆU THÀNH CÔNG ===\n";

} catch (\Exception $e) {
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    if (DB::transactionLevel() > 0) {
        DB::rollBack();
    }
    echo "LỖI: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
    exit(1);
}
