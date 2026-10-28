<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Modules\Setting\Entities\Setting;

echo "=== BẮT ĐẦU CẬP NHẬT DANH MỤC NỔI BẬT & DỮ LIỆU GÓC BẠN ĐỌC & ĐIỂM SÁCH ===\n";

DB::statement('SET FOREIGN_KEY_CHECKS=0;');

// -------------------------------------------------------------
// 1. ĐĂNG KÝ FILES VÀ ENTITY_FILES CHO CATEGORY LOGOS & BLOG IMAGES
// -------------------------------------------------------------
echo "1. Đang đăng ký file media vào cơ sở dữ liệu...\n";

$catFiles = [
    1 => ['name' => 'cat_van_hoc.svg', 'path' => 'media/cat_van_hoc.svg'],
    7 => ['name' => 'cat_kinh_te.svg', 'path' => 'media/cat_kinh_te.svg'],
    13 => ['name' => 'cat_ky_nang.svg', 'path' => 'media/cat_ky_nang.svg'],
    18 => ['name' => 'cat_tam_ly.svg', 'path' => 'media/cat_tam_ly.svg'],
    22 => ['name' => 'cat_thieu_nhi.svg', 'path' => 'media/cat_thieu_nhi.svg'],
    32 => ['name' => 'cat_khoa_hoc.svg', 'path' => 'media/cat_khoa_hoc.svg'],
];

// Xóa entity_files cũ của category zone 'logo'
DB::table('entity_files')
    ->where('entity_type', 'Modules\Category\Entities\Category')
    ->where('zone', 'logo')
    ->delete();

foreach ($catFiles as $catId => $fInfo) {
    $existing = DB::table('files')->where('path', $fInfo['path'])->first();
    if ($existing) {
        $fileId = $existing->id;
    } else {
        $fullPath = public_path('storage/' . $fInfo['path']);
        $size = file_exists($fullPath) ? filesize($fullPath) : 2048;
        $fileId = DB::table('files')->insertGetId([
            'user_id' => 1,
            'filename' => $fInfo['name'],
            'disk' => 'public',
            'path' => $fInfo['path'],
            'extension' => 'svg',
            'mime' => 'image/svg+xml',
            'size' => $size,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    DB::table('entity_files')->insert([
        'file_id' => $fileId,
        'entity_type' => 'Modules\Category\Entities\Category',
        'entity_id' => $catId,
        'zone' => 'logo',
        'created_at' => now(),
        'updated_at' => now(),
    ]);
}
echo "-> Đã gắn 6 SVG Icon Logo cho 6 Danh mục nổi bật.\n";


// -------------------------------------------------------------
// 2. CẤU HÌNH SETTINGS CHO DANH MỤC NỔI BẬT (FEATURED CATEGORIES)
// -------------------------------------------------------------
echo "2. Đang cấu hình cài đặt cho Danh mục nổi bật...\n";

Setting::set('storefront_featured_categories_section_enabled', '1');

// Cấu hình từng tab 1 đến 6
$slots = [
    1 => 1,  // Sách Văn Học
    2 => 7,  // Sách Kinh Tế
    3 => 13, // Sách Kỹ Năng Sống
    4 => 18, // Sách Tâm Lý & Nuôi Dạy Con
    5 => 22, // Sách Thiếu Nhi
    6 => 32, // Sách Khoa Học & Công Nghệ
];

foreach ($slots as $slot => $catId) {
    Setting::set("storefront_featured_categories_section_category_{$slot}_category_id", (string)$catId);
    Setting::set("storefront_featured_categories_section_category_{$slot}_product_type", 'category_products');
    Setting::set("storefront_featured_categories_section_category_{$slot}_products_limit", '10');
}

// Tiêu đề & phụ đề dịch
Setting::setTranslatableSettings([
    'storefront_featured_categories_section_title' => [
        'vi' => 'Danh Mục Nổi Bật',
        'en' => 'Featured Categories',
    ],
    'storefront_featured_categories_section_subtitle' => [
        'vi' => 'Khám phá các danh mục sách đặc sắc được bạn đọc yêu thích nhất tại DalifaBooks',
        'en' => 'Explore the most loved book categories at DalifaBooks',
    ],
]);
echo "-> Cấu hình Danh mục nổi bật thành công (đầy đủ 6 slot + product_type + limit).\n";


// -------------------------------------------------------------
// 3. CẤU HÌNH SETTINGS CHO GÓC BẠN ĐỌC & ĐIỂM SÁCH (BLOG SECTION)
// -------------------------------------------------------------
echo "3. Đang cấu hình cài đặt cho mục Góc bạn đọc & Điểm sách...\n";

Setting::set('storefront_blogs_section_enabled', '1');
Setting::set('storefront_recent_blogs', '6');

Setting::setTranslatableSettings([
    'storefront_blogs_section_title' => [
        'vi' => 'Góc Bạn Đọc & Điểm Sách',
        'en' => "Reader's Corner & Book Reviews",
    ],
]);
echo "-> Bật khối Blog trang chủ và đặt tên 'Góc Bạn Đọc & Điểm Sách'.\n";


// -------------------------------------------------------------
// 4. DANH MỤC BÀI VIẾT (BLOG CATEGORIES)
// -------------------------------------------------------------
echo "4. Đang tạo Danh mục bài viết (Blog Categories)...\n";

DB::table('blog_category_translations')->truncate();
DB::table('blog_categories')->truncate();

$blogCats = [
    ['slug' => 'diem-sach', 'name_vi' => 'Điểm Sách Hay', 'name_en' => 'Book Reviews'],
    ['slug' => 'goc-ban-doc', 'name_vi' => 'Góc Bạn Đọc', 'name_en' => "Reader's Corner"],
    ['slug' => 'tac-gia-tac-pham', 'name_vi' => 'Tác Giả & Tác Phẩm', 'name_en' => 'Authors & Works'],
    ['slug' => 'van-hoa-doc', 'name_vi' => 'Văn Hóa Đọc', 'name_en' => 'Reading Culture'],
];

$blogCatMap = [];
foreach ($blogCats as $bc) {
    $bcId = DB::table('blog_categories')->insertGetId([
        'slug' => $bc['slug'],
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('blog_category_translations')->insert([
        ['blog_category_id' => $bcId, 'locale' => 'vi', 'name' => $bc['name_vi']],
        ['blog_category_id' => $bcId, 'locale' => 'en', 'name' => $bc['name_en']],
    ]);

    $blogCatMap[$bc['slug']] = $bcId;
}
echo "-> Đã tạo 4 Danh mục bài viết.\n";


// -------------------------------------------------------------
// 5. THẺ BÀI VIẾT (BLOG TAGS)
// -------------------------------------------------------------
echo "5. Đang tạo Thẻ bài viết (Blog Tags)...\n";

DB::table('blog_post_blog_tag')->truncate();
DB::table('blog_tag_translations')->truncate();
DB::table('blog_tags')->truncate();

$blogTags = [
    ['slug' => 'sach-hay-nen-doc', 'name_vi' => 'Sách Hay Nên Đọc', 'name_en' => 'Must-Read Books'],
    ['slug' => 'review-sach', 'name_vi' => 'Review Sách', 'name_en' => 'Book Reviews'],
    ['slug' => 'cam-nhan-sach', 'name_vi' => 'Cảm Nhận Sách', 'name_en' => 'Book Reflections'],
    ['slug' => 'trich-dan-hay', 'name_vi' => 'Trích Dẫn Hay', 'name_en' => 'Inspiring Quotes'],
    ['slug' => 'phat-trien-ban-than', 'name_vi' => 'Phát Triển Bản Thân', 'name_en' => 'Self Improvement'],
    ['slug' => 'kinh-doanh-tai-chinh', 'name_vi' => 'Kinh Doanh & Tài Chính', 'name_en' => 'Business & Finance'],
];

$blogTagMap = [];
foreach ($blogTags as $bt) {
    $btId = DB::table('blog_tags')->insertGetId([
        'slug' => $bt['slug'],
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('blog_tag_translations')->insert([
        ['blog_tag_id' => $btId, 'locale' => 'vi', 'name' => $bt['name_vi']],
        ['blog_tag_id' => $btId, 'locale' => 'en', 'name' => $bt['name_en']],
    ]);

    $blogTagMap[$bt['slug']] = $btId;
}
echo "-> Đã tạo 6 Thẻ bài viết.\n";


// -------------------------------------------------------------
// 6. BÀI VIẾT CHI TIẾT (BLOG POSTS)
// -------------------------------------------------------------
echo "6. Đang tạo Bài viết Điểm sách chuyên sâu...\n";

DB::table('blog_post_translations')->truncate();
DB::table('blog_posts')->truncate();

// Xóa entity_files cũ của BlogPost
DB::table('entity_files')
    ->where('entity_type', 'Modules\Blog\Entities\BlogPost')
    ->where('zone', 'featured_image')
    ->delete();

$posts = [
    [
        'slug' => 'diem-sach-dac-nhan-tam-gia-tri-truong-ton',
        'category' => 'diem-sach',
        'tags' => ['sach-hay-nen-doc', 'review-sach', 'phat-trien-ban-than'],
        'image' => 'blog_dac_nhan_tam.svg',
        'title_vi' => 'Điểm sách: "Đắc Nhân Tâm" – Giá trị trường tồn của nghệ thuật đối nhân xử thế',
        'title_en' => 'Book Review: "How to Win Friends and Influence People" – Timeless Wisdom of Human Connection',
        'desc_vi' => '
<p class="lead">Xuất bản lần đầu tiên năm 1936, <strong>"Đắc Nhân Tâm" (How to Win Friends and Influence People)</strong> của Dale Carnegie vẫn luôn là tác phẩm giữ vững vị trí kim chỉ nam trong nghệ thuật giao tiếp và đối nhân xử thế qua gần một thế kỷ.</p>

<h3>1. Nghệ thuật giao tiếp bắt đầu từ sự chân thành</h3>
<p>Điều làm nên sức sống mãnh liệt của Đắc Nhân Tâm không phải là những kỹ xảo thao túng tâm lý hay mẹo vặt ăn nói, mà chính là <em>sự thành thật xuất phát từ đáy lòng</em>. Carnegie khẳng định: muốn người khác quan tâm đến mình, trước hết bạn phải thật lòng quan tâm đến họ.</p>

<blockquote>
  "Đừng sợ những kẻ thù tấn công bạn. Hãy dè chừng những người bạn tâng bốc bạn. Lời khen ngợi chân thành là món quà vô giá của tâm hồn."
</blockquote>

<h3>2. Ba nguyên tắc vàng thu phục lòng người</h3>
<ul>
  <li><strong>Không chỉ trích, oán trách hay than phiền:</strong> Chỉ trích chỉ thổi bùng ngọn lửa tự ái và lòng thù hận, không thể thay đổi hành vi bền vững.</li>
  <li><strong>Thành thật ngợi khen và cảm kích:</strong> Nhu cầu được công nhận và tôn trọng là khao khát sâu kín nhất của bản tính con người.</li>
  <li><strong>Khơi gợi ở người khác ý muốn thiết tha:</strong> Nói về điều người ta muốn và chỉ cho họ cách để đạt được điều đó.</li>
</ul>

<h3>3. Lời kết từ DalifaBooks</h3>
<p>Đắc Nhân Tâm không phải cuốn sách để đọc một lần rồi cất lên kệ, mà là người bạn đồng hành cần được chiêm nghiệm và thực hành mỗi ngày. Tác phẩm dạy chúng ta trở thành phiên bản tử tế hơn, bao dung hơn và thấu hiểu hơn trong một thế giới đầy biến động.</p>
',
        'desc_en' => '
<p class="lead">First published in 1936, <strong>"How to Win Friends and Influence People"</strong> by Dale Carnegie remains the ultimate masterpiece in human relations and social communication.</p>
<h3>1. Authentic Connection Above All</h3>
<p>Carnegie stresses that true influence does not come from superficial tricks, but from genuine empathy and active listening.</p>
<blockquote>"You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you."</blockquote>
<h3>2. Core Principles</h3>
<ul>
  <li>Do not criticize, condemn, or complain.</li>
  <li>Give honest and sincere appreciation.</li>
  <li>Arouse in the other person an eager want.</li>
</ul>
<p>A must-read timeless classic for everyone seeking personal and professional success.</p>
',
    ],

    [
        'slug' => 'review-nha-gia-kim-khi-khao-khat-du-lon',
        'category' => 'diem-sach',
        'tags' => ['sach-hay-nen-doc', 'review-sach', 'trich-dan-hay'],
        'image' => 'blog_nha_gia_kim.svg',
        'title_vi' => 'Review "Nhà Giả Kim": Khi khao khát đủ lớn, cả vũ trụ sẽ hợp lực giúp bạn',
        'title_en' => 'Review "The Alchemist": When You Truly Desire Something, All the Universe Conspires',
        'desc_vi' => '
<p class="lead">Với hơn 150 triệu bản được bán ra trên toàn cầu và được dịch sang hơn 80 ngôn ngữ, <strong>"Nhà Giả Kim" (The Alchemist)</strong> của nhà văn Paulo Coelho là cuốn sách gối đầu giường của hàng triệu người trẻ trên con đường tìm kiếm sứ mệnh cuộc đời.</p>

<h3>1. Hành trình đi tìm Vận mệnh cá nhân</h3>
<p>Cuốn sách kể về chàng chăn cừu Santiago người Tây Ban Nha. Từ bỏ cuộc sống êm ấm với đàn cừu, cậu dấn thân vào hành trình vượt sa mạc Sahara hiểm trở để tìm kiếm kho báu kim tự tháp mà cậu nhìn thấy trong giấc mơ lặp lại nhiều lần.</p>

<blockquote>
  "Khi bạn thực sự khao khát một điều gì đó, toàn bộ vũ trụ sẽ hợp lực giúp bạn đạt được nó." — Paulo Coelho
</blockquote>

<h3>2. Kho báu thật sự nằm ở đâu?</h3>
<p>Santiago trải qua muôn vàn thử thách: bị lừa hết tiền, làm việc tại cửa hàng pha lê, lạc giữa sa mạc và gặp gỡ Nhà Giả Kim thông thái. Cuối cùng, cậu nhận ra kho báu quý giá nhất không nằm ở đích đến, mà chính là hành trình cậu đã đi qua, những con người cậu đã gặp và tình yêu sâu đậm với nàng Fatima.</p>

<h3>3. Chiêm nghiệm dành cho bạn đọc DalifaBooks</h3>
<p>Mỗi chúng ta đều có một "vận mệnh cá nhân" (Personal Legend). Đừng để nỗi sợ hãi thất bại ngăn cản bạn bước ra khỏi vùng an toàn. Hãy lắng nghe trái tim mình, bởi vì trái tim bạn ở đâu thì kho báu của bạn cũng ở đó.</p>
',
        'desc_en' => '
<p class="lead">With over 150 million copies sold worldwide, Paulo Coelho’s <strong>"The Alchemist"</strong> is an enchanting fable about following your dreams and listening to your heart.</p>
<h3>1. Following Your Personal Legend</h3>
<p>The story follows Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found.</p>
<blockquote>"When you want something, all the universe conspires in helping you to achieve it."</blockquote>
<h3>2. The True Treasure</h3>
<p>Santiago’s journey teaches us about the essential wisdom of listening to our hearts, recognizing opportunity, and learning to read the omens strewn along life’s path.</p>
',
    ],

    [
        'slug' => 'goc-ban-doc-5-cuon-sach-kinh-te-tai-dinh-hinh-tu-duy',
        'category' => 'goc-ban-doc',
        'tags' => ['sach-hay-nen-doc', 'kinh-doanh-tai-chinh'],
        'image' => 'blog_kinh_te.svg',
        'title_vi' => 'Góc Bạn Đọc: 5 cuốn sách kinh tế giúp bạn tái định hình tư duy tài chính năm 2026',
        'title_en' => "Reader's Corner: 5 Books to Revolutionize Your Financial Mindset in 2026",
        'desc_vi' => '
<p class="lead">Trong thời đại kinh tế biến động nhanh chóng, năng lực quản lý tài chính cá nhân và tư duy kinh doanh chính là tấm lá chắn vững chắc nhất bảo vệ bạn và gia đình. Dưới đây là 5 cuốn sách kinh tế được cộng đồng độc giả DalifaBooks đánh giá cao nhất.</p>

<h3>Top 5 tác phẩm kinh tế không thể bỏ qua:</h3>
<ol>
  <li><strong>Tâm Lý Học Về Tiền (The Psychology of Money) – Morgan Housel:</strong> Khẳng định quản lý tiền bạc tốt không phụ thuộc vào trí thông minh mà phụ thuộc vào hành vi và cảm xúc của bạn.</li>
  <li><strong>Cha Giàu Cha Nghèo (Rich Dad Poor Dad) – Robert Kiyosaki:</strong> Phân biệt rạch ròi giữa "Tài sản" và "Tiêu sản", xây dựng dòng tiền thu nhập thụ động.</li>
  <li><strong>Tư Duy Nhanh Và Chậm (Thinking, Fast and Slow) – Daniel Kahneman:</strong> Giải mã những định kiến nhận thức và cạm bẫy tâm lý trong việc ra quyết định đầu tư.</li>
  <li><strong>Khởi Nghiệp Tinh Gọn (The Lean Startup) – Eric Ries:</strong> Phương pháp luận hiện đại giúp hiện thực hóa ý tưởng kinh doanh với chi phí và rủi ro thấp nhất.</li>
  <li><strong>Người Giàu Có Nhất Thành Babylon – George S. Clason:</strong> Những quy luật vàng bất biến về tiết kiệm, tích lũy 10% thu nhập và bắt đồng tiền phải làm việc cho mình.</li>
</ol>

<blockquote>
  "Người giàu tập trung vào cột tài sản trong khi những người khác chỉ chăm chú vào bảng kết quả thu nhập."
</blockquote>
',
        'desc_en' => '
<p class="lead">Financial literacy is the foundation of long-term freedom. Here are 5 essential economic and personal finance books recommended by DalifaBooks:</p>
<ol>
  <li><strong>The Psychology of Money</strong> – Morgan Housel</li>
  <li><strong>Rich Dad Poor Dad</strong> – Robert Kiyosaki</li>
  <li><strong>Thinking, Fast and Slow</strong> – Daniel Kahneman</li>
  <li><strong>The Lean Startup</strong> – Eric Ries</li>
  <li><strong>The Richest Man in Babylon</strong> – George S. Clason</li>
</ol>
',
    ],

    [
        'slug' => 'tac-gia-haruki-murakami-rung-na-uy',
        'category' => 'tac-gia-tac-pham',
        'tags' => ['sach-hay-nen-doc', 'cam-nhan-sach', 'trich-dan-hay'],
        'image' => 'blog_rung_na_uy.svg',
        'title_vi' => 'Tác giả & Tác phẩm: Haruki Murakami và nỗi cô đơn đẹp đẽ trong "Rừng Na Uy"',
        'title_en' => 'Authors & Works: Haruki Murakami and the Haunting Beauty of "Norwegian Wood"',
        'desc_vi' => '
<p class="lead">Nhắc đến văn học đương đại Nhật Bản, <strong>Haruki Murakami</strong> luôn là cái tên mang lại những xúc cảm đặc biệt nhất. Và trong số các kiệt tác của ông, <strong>"Rừng Na Uy" (Norwegian Wood)</strong> vẫn luôn là nốt trầm xao xuyến nhất về tuổi đôi mươi.</p>

<h3>1. Giai điệu hoài niệm về những năm tháng thanh xuân</h3>
<p>Lấy bối cảnh Tokyo thập niên 1960 đầy biến động, cuốn tiểu thuyết theo chân chàng sinh viên Toru Watanabe cùng mối quan hệ giằng xé giữa hai người con gái: Naoko u buồn, mong manh và Midori tràn trề nhựa sống.</p>

<blockquote>
  "Cái chết không phải là điều đối nghịch với sự sống, mà là một phần nằm ngay trong lòng sự sống. Bằng cách sống cuộc đời của mình, chúng ta nuôi dưỡng cái chết." — Haruki Murakami
</blockquote>

<h3>2. Nỗi cô đơn bản thể và khát vọng yêu thương</h3>
<p>Murakami đã khắc họa tài tình nỗi cô đơn không thể chia sẻ của thế hệ trẻ. Nhưng ẩn sâu dưới sự mất mát và u uất là niềm khát khao sống mãnh liệt, nỗ lực tự chữa lành và lòng dũng cảm tiến về phía trước.</p>

<h3>3. Đọc Murakami tại DalifaBooks</h3>
<p>Hãy chọn cho mình một góc yên tĩnh, bật giai điệu bài hát "Norwegian Wood" của The Beatles và chìm đắm vào từng trang viết giàu chất thơ của Haruki Murakami.</p>
',
        'desc_en' => '
<p class="lead">Set in 1960s Tokyo, <strong>"Norwegian Wood"</strong> by Haruki Murakami is a nostalgic and poignant story of loss, sexuality, and the fragility of youth.</p>
<blockquote>"Death is not the opposite of life, but a part of it."</blockquote>
<p>A mesmerizing literary journey into human longing and memory that has touched readers worldwide.</p>
',
    ],

    [
        'slug' => 'van-hoa-doc-bi-quyet-doc-30-trang-sach-moi-ngay',
        'category' => 'van-hoa-doc',
        'tags' => ['phat-trien-ban-than', 'sach-hay-nen-doc'],
        'image' => 'blog_thoi_quen_doc.svg',
        'title_vi' => 'Văn Hóa Đọc: Bí quyết duy trì thói quen đọc 30 trang sách mỗi ngày cho người bận rộn',
        'title_en' => 'Reading Culture: How to Read 30 Pages a Day Even with a Busy Schedule',
        'desc_vi' => '
<p class="lead">Nhiều người thường than phiền rằng họ quá bận rộn để đọc sách. Tuy nhiên, nếu bạn đọc <strong>30 trang sách mỗi ngày</strong>, sau một năm bạn sẽ hoàn thành từ <strong>30 đến 40 cuốn sách</strong> — một kho tàng tri thức khổng lồ có thể thay đổi hoàn toàn cuộc đời bạn.</p>

<h3>Phương pháp 4 bước xây dựng thói quen đọc sách bền vững:</h3>
<ul>
  <li><strong>Nguyên tắc 20 phút buổi sáng:</strong> Dậy sớm hơn 20 phút và đọc sách trước khi chạm vào điện thoại thông minh. Trí não buổi sáng tiếp thu kiến thức hiệu quả gấp 3 lần.</li>
  <li><strong>Luôn mang theo một cuốn sách:</strong> Tận dụng các khoảng thời gian "chết" trong ngày như chờ xe bus, giờ nghỉ trưa, xếp hàng.</li>
  <li><strong>Kỹ thuật ghi chép Smart Notes:</strong> Ghi lại 1-2 ý tưởng tâm đắc nhất và tự hỏi: "Mình có thể áp dụng điều này vào công việc hôm nay như thế nào?".</li>
  <li><strong>Tạo không gian đọc truyền cảm hứng:</strong> Một góc đọc nhỏ ấm cúng, đủ ánh sáng cùng ly trà hoặc cà phê thơm sẽ biến việc đọc thành khoảnh khắc thư giãn tuyệt vời nhất trong ngày.</li>
</ul>

<blockquote>
  "Hôm nay bạn đọc sách, ngày mai bạn dẫn đầu. Tri thức là khoản đầu tư duy nhất luôn sinh lời vô hạn."
</blockquote>
',
        'desc_en' => '
<p class="lead">Reading 30 pages a day equates to nearly 40 books a year. Here is the proven 4-step framework from DalifaBooks to build an unbreakable reading habit:</p>
<ul>
  <li>Dedicate 20 quiet minutes every morning before screen time.</li>
  <li>Always carry a book with you for waiting intervals.</li>
  <li>Take actionable Smart Notes on key takeaways.</li>
  <li>Design an inviting, clutter-free reading nook at home.</li>
</ul>
',
    ],

    [
        'slug' => 'diem-sach-hoang-tu-be-nhin-bang-trai-tim',
        'category' => 'diem-sach',
        'tags' => ['sach-hay-nen-doc', 'review-sach', 'trich-dan-hay'],
        'image' => 'blog_hoang_tu_be.svg',
        'title_vi' => 'Điểm sách: "Hoàng Tử Bé" – Những bài học cuộc đời chỉ thấy rõ bằng trái tim',
        'title_en' => 'Book Review: "The Little Prince" – Life Lessons Only Visible with the Heart',
        'desc_vi' => '
<p class="lead"><strong>"Hoàng Tử Bé" (Le Petit Prince)</strong> của phi công kiêm nhà văn Pháp Antoine de Saint-Exupéry được coi là cuốn truyện thiếu nhi viết cho người lớn hay nhất mọi thời đại. Mỗi trang sách là một bài học nhân sinh sâu sắc và thuần khiết.</p>

<h3>1. Ý nghĩa thiêng liêng của sự "thuần hóa"</h3>
<p>Cuộc gặp gỡ giữa Hoàng Tử Bé và Chú Cáo trên Trái Đất là một trong những đoạn văn đẹp nhất lịch sử văn học thế giới. Chú Cáo dạy cậu rằng: muốn có một người bạn thật sự, ta phải dành thời gian, sự kiên nhẫn và trách nhiệm để "thuần hóa" lẫn nhau.</p>

<blockquote>
  "Người ta chỉ thấy rõ bằng trái tim. Cái cốt tử vô hình đối với đôi mắt." — Antoine de Saint-Exupéry
</blockquote>

<h3>2. Bông hồng duy nhất giữa hàng ngàn bông hồng</h3>
<p>Dù trên Trái Đất có cả một vườn hoa hồng rực rỡ, nhưng đối với Hoàng Tử Bé, bông hoa hồng trên tiểu tinh cầu B612 vẫn là duy nhất, bởi cậu đã bỏ công chăm sóc, tưới nước và bảo vệ nó khỏi gió lạnh. Chính thời gian bạn bỏ ra cho bông hồng của mình mới làm cho bông hồng ấy trở nên quan trọng đến thế.</p>

<h3>3. Đừng để tâm hồn mình trở thành "người lớn kỳ quặc"</h3>
<p>Tác phẩm là lời nhắc nhở dịu dàng: dù cuộc sống có bận rộn và khắc nghiệt đến đâu, hãy luôn giữ lại sự trong trẻo, chân thành và khả năng nhìn nhận thế giới bằng ánh mắt đầy yêu thương của tuổi thơ.</p>
',
        'desc_en' => '
<p class="lead"><strong>"The Little Prince"</strong> by Antoine de Saint-Exupéry is a poetic tale about the loneliness, friendship, love, and loss of a young prince who visits various planets in space.</p>
<blockquote>"It is only with the heart that one can see rightly; what is essential is invisible to the eye."</blockquote>
<p>A timeless treasure reminding adults of the wonder and innocence of childhood.</p>
',
    ],
];

foreach ($posts as $idx => $p) {
    // Đăng ký file ảnh đại diện vào files
    $fPath = 'media/' . $p['image'];
    $existing = DB::table('files')->where('path', $fPath)->first();
    if ($existing) {
        $fileId = $existing->id;
    } else {
        $fullPath = public_path('storage/' . $fPath);
        $size = file_exists($fullPath) ? filesize($fullPath) : 4096;
        $fileId = DB::table('files')->insertGetId([
            'user_id' => 1,
            'filename' => $p['image'],
            'disk' => 'public',
            'path' => $fPath,
            'extension' => 'svg',
            'mime' => 'image/svg+xml',
            'size' => $size,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    $catId = $blogCatMap[$p['category']] ?? null;

    $pId = DB::table('blog_posts')->insertGetId([
        'user_id' => 1,
        'blog_category_id' => $catId,
        'slug' => $p['slug'],
        'publish_status' => 'published',
        'created_at' => now()->subDays($idx * 2),
        'updated_at' => now()->subDays($idx * 2),
    ]);

    // Bản dịch vi & en
    DB::table('blog_post_translations')->insert([
        [
            'blog_post_id' => $pId,
            'locale' => 'vi',
            'title' => $p['title_vi'],
            'description' => trim($p['desc_vi']),
        ],
        [
            'blog_post_id' => $pId,
            'locale' => 'en',
            'title' => $p['title_en'],
            'description' => trim($p['desc_en']),
        ],
    ]);

    // Gắn Tags
    foreach ($p['tags'] as $tSlug) {
        if (isset($blogTagMap[$tSlug])) {
            DB::table('blog_post_blog_tag')->insert([
                'blog_post_id' => $pId,
                'blog_tag_id' => $blogTagMap[$tSlug],
            ]);
        }
    }

    // Gắn Ảnh nổi bật vào entity_files
    DB::table('entity_files')->insert([
        'file_id' => $fileId,
        'entity_type' => 'Modules\Blog\Entities\BlogPost',
        'entity_id' => $pId,
        'zone' => 'featured_image',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    echo "-> Đã tạo bài viết [{$pId}]: {$p['title_vi']}\n";
}


// -------------------------------------------------------------
// 7. THÊM "GÓC BẠN ĐỌC" VÀO MENU CHÍNH (PRIMARY MENU - ID 3)
// -------------------------------------------------------------
echo "7. Đang cập nhật Menu chính trên Header...\n";

// Kiểm tra xem đã có menu item trỏ đến /blog/posts chưa
$existingMenuItem = DB::table('menu_items')
    ->where('menu_id', 3)
    ->where('url', '/blog/posts')
    ->first();

if (!$existingMenuItem) {
    // Dời menu 'Liên hệ' lên position 7
    DB::table('menu_items')
        ->where('menu_id', 3)
        ->where('position', 6)
        ->update(['position' => 7]);

    $newMenuItemId = DB::table('menu_items')->insertGetId([
        'menu_id' => 3,
        'parent_id' => null,
        'category_id' => null,
        'page_id' => null,
        'type' => 'url',
        'url' => '/blog/posts',
        'icon' => null,
        'target' => '_self',
        'position' => 6,
        'is_root' => 0,
        'is_fluid' => 0,
        'is_active' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('menu_item_translations')->insert([
        ['menu_item_id' => $newMenuItemId, 'locale' => 'vi', 'name' => 'Góc Bạn Đọc & Điểm Sách'],
        ['menu_item_id' => $newMenuItemId, 'locale' => 'en', 'name' => "Reader's Corner"],
    ]);

    echo "-> Đã thêm 'Góc Bạn Đọc & Điểm Sách' vào Menu chính (Header).\n";
} else {
    echo "-> Mục menu /blog/posts đã tồn tại.\n";
}


// -------------------------------------------------------------
// 8. XÓA TOÀN BỘ CACHE
// -------------------------------------------------------------
echo "8. Đang làm mới cache hệ thống...\n";
Cache::flush();

echo "=== HOÀN TẤT THÀNH CÔNG 100% CẬP NHẬT DỮ LIỆU DALIFA BOOKS ===\n";
