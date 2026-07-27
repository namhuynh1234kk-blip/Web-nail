import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  // --- SPA THƯ GIÃN ---
  {
    id: 'spa-body-relax',
    category: 'spa',
    title: 'Massage Body Thư Giãn Tinh Dầu',
    subtitle: 'Phục hồi thể chất & xua tan mệt mỏi',
    price: 350000,
    originalPrice: 450000,
    duration: 60,
    icon: '🪷',
    popular: true,
    description: 'Kết hợp kỹ thuật miết vuốt nhẹ nhàng với tinh dầu thảo mộc organic giúp giảm căng cơ, ngủ ngon sâu giấc.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    protocolSteps: [
      'Khởi động ấn huyệt lưng & vai cổ',
      'Thoa tinh dầu Oải Hương / Ngọc Lan Tây ấm',
      'Đi ngải cứu và đá nóng xoa dịu vùng đau nhức',
      'Massage tay, chân & ấn huyệt lòng bàn chân',
      'Massage đầu cổ vai gáy và lau khăn ấm thảo dược'
    ],
    targetSkinOrBody: 'Phù hợp người làm việc văn phòng, đau mỏi vai gáy, mệt mỏi suy nhược.',
    benefits: ['Giảm căng thẳng mệt mỏi', 'Tăng cường tuần hoàn máu', 'Cải thiện chất lượng giấc ngủ']
  },
  {
    id: 'spa-hot-stone',
    category: 'spa',
    title: 'Massage Đá Nóng Năng Lượng Núi Lửa',
    subtitle: 'Thải độc sâu & điều hòa khí huyết',
    price: 480000,
    originalPrice: 580000,
    duration: 75,
    icon: '🔥',
    popular: true,
    description: 'Nhiệt lượng từ đá bazan núi Lửa truyền sâu vào các huyệt đạo giúp giải tỏa hàn khí và đả thông kinh lạc.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    protocolSteps: [
      'Uống trà thảo mộc & ngâm chân muối gừng ấm',
      'Ấn huyệt toàn thân mở các đường kinh lạc',
      'Di chuyển đá nóng truyền nhiệt từng vùng lưng & vai',
      'Đặt đá năng lượng dọc sống lưng',
      'Thư giãn mặt và da đầu với khăn chườm thảo mộc'
    ],
    targetSkinOrBody: 'Dành cho người hay bị lạnh tay chân, khí huyết kém lưu thông, nhức mỏi lưng.',
    benefits: ['Bài tiết độc tố qua da', 'Giải tỏa tắc nghẽn kinh lạc', 'Mang lại cảm giác ấm áp, thư thái']
  },
  {
    id: 'spa-herbal-shampoo',
    category: 'spa',
    title: 'Gội Đầu Dưỡng Sinh Thảo Dược Lumé',
    subtitle: 'Chăm sóc da đầu & massage thư giãn sâu',
    price: 250000,
    originalPrice: 320000,
    duration: 60,
    icon: '🌿',
    popular: true,
    description: 'Sử dụng nước bồ kết nấu tươi kết hợp vỏ bưởi, sả, mần trầu giúp sạch gàu, kiềm dầu và chống gãy rụng.',
    image: 'https://cdn.tgdd.vn/Files/2022/10/13/1478543/top-12-spa-goi-dau-duong-sinh-thao-duoc-tot-nhat-tai-tp-ho-chi-minh-202402271614220342.jpeg',
    protocolSteps: [
      'Khai thông huyệt vùng đầu & xoa bóp vai cổ gáy',
      'Gội sạch lần 1 với dầu thảo mộc tự nhiên',
      'Ấn huyệt da đầu & gội nước bồ kết cô đặc nóng',
      'Ủ mượt tóc bằng kem ủ hạnh nhân',
      'Tưới nước thảo mộc tuần hoàn & sấy tạo kiểu nhẹ nhàng'
    ],
    targetSkinOrBody: 'Mọi loại da đầu, đặc biệt người hay đau đầu, rụng tóc, stress công việc.',
    benefits: ['Nuôi dưỡng chân tóc khỏe', 'Giải tỏa nhức đầu căng thẳng', 'Sạch gàu ngứa tự nhiên']
  },

  // --- CHĂM SÓC DA (FACIAL) ---
  {
    id: 'facial-deep-clean',
    category: 'facial',
    title: 'Chăm Sóc Da Mặt Chuyên SDeep Cleansing',
    subtitle: 'Làm sạch sâu & thải độc bùn khoáng',
    price: 390000,
    originalPrice: 500000,
    duration: 60,
    icon: '✨',
    popular: true,
    description: 'Quy trình chuẩn y khoa loại bỏ sợi bã nhờn, mụn đầu đen và tế bào chết mang lại làn da thông thoáng rạng rỡ.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    protocolSteps: [
      'Tẩy trang & rửa mặt sinh học dịu nhẹ',
      'Tẩy tế bào chết enzyme hoa quả',
      'Xông hơi thảo dược & hút sạch sợi bã nhờn',
      'Massage nâng cơ mặt với serum HA cấp nước',
      'Đắp mặt nạ Bùn khoáng / Hoa cúc làm dịu da',
      'Chiếu ánh sáng sinh học vòm Omni Light',
      'Thoa kem dưỡng cấp ẩm & kem chống nắng'
    ],
    targetSkinOrBody: 'Da dầu mụn, bít tắc lỗ chân lông, da xỉn màu do ô nhiễm.',
    benefits: ['Thu nhỏ lỗ chân lông', 'Sáng mịn rạng rỡ', 'Cân bằng độ ẩm tự nhiên']
  },
  {
    id: 'facial-collagen-glow',
    category: 'facial',
    title: 'Cấy Tinh Chất Collagen & Vàng 24K',
    subtitle: 'Trẻ hóa da, căng bóng & mờ nếp nhăn',
    price: 650000,
    originalPrice: 850000,
    duration: 75,
    icon: '💎',
    popular: true,
    description: 'Ứng dụng công nghệ điện di ion siêu âm đẩy sâu tinh chất Collagen tươi và lá vàng 24K nano giúp da bóng khỏe.',
    image: 'https://rohtoaohalclinic.com.vn/vnt_upload/service/08_2018/dien-di-1.jpg',
    protocolSteps: [
      'Làm sạch sâu và cân bằng pH da bằng Toner hoa hồng',
      'Tẩy tế bào chết bằng công nghệ Sóng siêu âm',
      'Thoa Ampoule Collagen Peptide tươi',
      'Đi máy Điện di Lạnh -10°C khóa ẩm tinh chất',
      'Mặt nạ Vàng 24K nguyên chất dán phủ toàn mặt',
      'Massage vai cổ gáy thư giãn trong lúc đắp nạ'
    ],
    targetSkinOrBody: 'Da bắt đầu lão hóa, da khô thiếu sức sống, da sau tuổi 25.',
    benefits: ['Căng bóng mướt mịn tức thì', 'Mờ nếp nhăn li ti', 'Tăng độ đàn hồi cho da']
  },

  // --- NAIL ART & FOOTCARE ---
  {
    id: 'nail-gel-art',
    category: 'nail',
    title: 'Nail Gel Design Nghệ Thuật Premium',
    subtitle: 'Chăm sóc móng & vẽ design theo yêu cầu',
    price: 280000,
    originalPrice: 350000,
    duration: 60,
    icon: '💅',
    popular: true,
    description: 'Chăm sóc da tay kỹ lưỡng, sơn gel bóng đẹp bền màu đến 4 tuần với các mẫu vẽ tay, tráng gương, đính đá sang trọng.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    protocolSteps: [
      'Ngâm tay thảo mộc làm mềm móng',
      'Nhặt da tỉ mỉ & tạo dáng móng (Nón, Vuông, Tròn, Oval)',
      'Sơn lót dưỡng bảo vệ móng gốc',
      'Sơn gel 2-3 lớp chuẩn màu sắc nét',
      'Vẽ Art/Tráng gương/Đính charm theo Catalogue',
      'Khóa bóng Top coat cao cấp không lo trầy xước',
      'Dưỡng viền móng bằng tinh dầu Oliu'
    ],
    targetSkinOrBody: 'Chị em yêu thích thời trang móng, chuẩn bị đi tiệc, đám cưới, du lịch.',
    benefits: ['Sơn bền bóng lâu trôi', 'Giữ form móng chuẩn đẹp', 'Không hại móng thật']
  },
  {
    id: 'nail-spa-pedicure',
    category: 'nail',
    title: 'Pedicure Spa Chăm Sóc Chân Thảo Mộc',
    subtitle: 'Chà gót hồng & Massage thư giãn bàn chân',
    price: 320000,
    originalPrice: 400000,
    duration: 60,
    icon: '🦶',
    popular: false,
    description: 'Chăm sóc toàn diện bàn chân, tẩy tế bào chết chà gót hồng mịn màng không rát và sơn gel chân sáng da.',
    image: 'https://lisanail.vn/wp-content/uploads/2024/06/massage-ngon-chan.jpg',
    protocolSteps: [
      'Ngâm chân bồn massage với muối biển & hoa hồng',
      'Cắt tỉa da chân & vệ sinh khỏe móng',
      'Chà gót chân bằng đầu chà chuyên dụng mềm mại',
      'Tẩy tế bào chết bắp chân & bàn chân',
      'Massage ấn huyệt chân với bơ hạt mỡ',
      'Sơn móng gel chân màu sắc tùy chọn'
    ],
    targetSkinOrBody: 'Người có gót chân nứt nẻ, thô ráp, người đi cao gót nhiều.',
    benefits: ['Gót chân hồng hào mịn màng', 'Giảm nhức mỏi cổ chân', 'Bộ móng chân chỉn chu']
  },

  // --- LÀM TÓC & STYLING ---
  {
    id: 'hair-cut-style',
    category: 'hair',
    title: 'Cắt Cúp & Tạo Kiểu Tóc Hàn Quốc',
    subtitle: 'Tư vấn dáng tóc hợp gương mặt',
    price: 220000,
    originalPrice: 280000,
    duration: 45,
    icon: '💇',
    popular: true,
    description: 'Hairstylist nhiều năm kinh nghiệm thiết kế kiểu tóc layer, bob, cúp chữ C tôn lên đường nét thanh tú của gương mặt.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    protocolSteps: [
      'Tư vấn chất tóc & chọn kiểu dáng phù hợp',
      'Xả tóc sạch với dầu gội dưỡng ẩm',
      'Cắt thiết kế tỉ mỉ theo kỹ thuật Hàn Quốc',
      'Sấy tạo kiểu uốn vồng bồng bềnh',
      'Thoa tinh dầu dưỡng bóng tóc mượt mà'
    ],
    targetSkinOrBody: 'Khách hàng muốn thay đổi phong cách, nâng cấp dáng tóc cá tính.',
    benefits: ['Tóc bồng bềnh vào nếp', 'Tôn nét đẹp khuôn mặt', 'Dễ chăm sóc tại nhà']
  },
  {
    id: 'hair-perm-color',
    category: 'hair',
    title: 'Uốn / Nhuộm Thời Trang Organic Collagen',
    subtitle: 'Màu nhuộm chuẩn tông, bóng mượt không xơ rối',
    price: 850000,
    originalPrice: 1200000,
    duration: 120,
    icon: '✨',
    popular: true,
    description: 'Sử dụng thuốc nhuộm/uốn thảo dược nhập khẩu Đức & Nhật bổ sung dưỡng chất Collagen giữ sợi tóc đàng hồi bóng mượt.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80',
    protocolSteps: [
      'Kiểm tra chất tóc & thử phản ứng màu',
      'Cắt bớt ngọn khô xơ và tạo form nền',
      'Pha chế thuốc uốn/nhuộm chứa Collagen dưỡng tóc',
      'Bôi thuốc và canh thời gian bằng nhiệt lạnh safe',
      'Gội xả khóa màu & hấp lụa mềm mượt',
      'Sấy định hình lọn tóc hoặc uốn xoăn nhẹ nhàng'
    ],
    targetSkinOrBody: 'Mọi loại tóc cần làm mới màu sắc hoặc sóng uốn quyến rũ.',
    benefits: ['Màu sắc bền đẹp thời thượng', 'Tóc không bị rát da đầu', 'Mượt mà như đi hấp phục hồi']
  }
];
