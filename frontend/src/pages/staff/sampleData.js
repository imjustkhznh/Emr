// Dữ liệu mẫu dùng RIÊNG cho Staff pages

export const samplePatients = [
  { id: 'BN001', name: 'Nguyễn Văn An', gender: 'Nam', phone: '0912345678', age: 35, status: 'chua_kham' },
  { id: 'BN002', name: 'Trần Thị Bình', gender: 'Nữ', phone: '0987654321', age: 28, status: 'da_kham' },
  { id: 'BN003', name: 'Lê Văn Cường', gender: 'Nam', phone: '0909123123', age: 45, status: 'dang_kham' },
  { id: 'BN004', name: 'Phạm Thị Dung', gender: 'Nữ', phone: '0911000001', age: 32, status: 'da_huy' },
  { id: 'BN005', name: 'Hoàng Minh Tuấn', gender: 'Nam', phone: '0910000000', age: 50, status: 'chua_kham' },
  { id: 'BN006', name: 'Vũ Thị Lan', gender: 'Nữ', phone: '091001234', age: 29, status: 'dang_kham' },
  { id: 'BN007', name: 'Đặng Văn Hùng', gender: 'Nam', phone: '091002468', age: 38, status: 'da_kham' },
  { id: 'BN008', name: 'Bùi Thị Mai', gender: 'Nữ', phone: '091003702', age: 26, status: 'da_huy' },
  { id: 'BN009', name: 'Phan Văn Quang', gender: 'Nam', phone: '091004936', age: 42, status: 'chua_kham' },
  { id: 'BN010', name: 'Đỗ Thị Hạnh', gender: 'Nữ', phone: '091006170', age: 31, status: 'dang_kham' },
];

export const sampleDoctors = [
  { id: 'BS001', name: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch' },
  { id: 'BS002', name: 'Dr. Phạm Mạnh Dũng', specialty: 'Nhi khoa' },
  { id: 'BS003', name: 'Dr. Vũ Quốc Thái', specialty: 'Ngoại khoa' },
];

export const sampleAppointments = [
  {
    id: '1',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    patientPhone: '0912345678',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    specialty: 'Tim mạch',
    appointmentDate: '2026-01-15',
    appointmentTime: '09:00',
    reason: 'Khám tổng quát',
    status: 'pending'
  },
  {
    id: '2',
    patientId: 'BN002',
    patientName: 'Trần Thị Bình',
    patientPhone: '0987654321',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    specialty: 'Nhi khoa',
    appointmentDate: '2026-01-15',
    appointmentTime: '10:30',
    reason: 'Khám da',
    status: 'confirmed'
  },
  {
    id: '3',
    patientId: 'BN003',
    patientName: 'Lê Văn Cường',
    patientPhone: '0909123123',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    specialty: 'Ngoại khoa',
    appointmentDate: '2026-01-16',
    appointmentTime: '14:00',
    reason: 'Khám tim',
    status: 'confirmed'
  },
  {
    id: '4',
    patientId: 'BN004',
    patientName: 'Phạm Thị Dung',
    patientPhone: '0911000001',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    specialty: 'Tim mạch',
    appointmentDate: '2026-01-16',
    appointmentTime: '15:30',
    reason: 'Tái khám',
    status: 'pending'
  },
  {
    id: '5',
    patientId: 'BN005',
    patientName: 'Hoàng Minh Tuấn',
    patientPhone: '0910000000',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    specialty: 'Nhi khoa',
    appointmentDate: '2026-01-17',
    appointmentTime: '11:00',
    reason: 'Khám da mặt',
    status: 'confirmed'
  },
];

export const samplePrescriptions = [
  {
    id: '1',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Huyết áp cao (Hypertension)',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { name: 'Amlodipine', dosage: '5mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { name: 'Hydrochlorothiazide', dosage: '25mg', frequency: '1 lần/sáng', duration: '30 ngày' }
    ],
    createdDate: '2026-01-15',
    status: 'active',
    notes: 'Uống thuốc sau bữa cơm. Tránh muối. Tập thể dục 30 phút/ngày.'
  },
  {
    id: '2',
    patientId: 'BN002',
    patientName: 'Trần Thị Bình',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    diagnosis: 'Viêm đường hô hấp cấp',
    medications: [
      { name: 'Azithromycin', dosage: '500mg', frequency: '1 lần/ngày', duration: '7 ngày' },
      { name: 'Dextromethorphan', dosage: '15mg', frequency: '2 lần/ngày', duration: '5 ngày' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Mỗi 4 giờ nếu cần', duration: '5 ngày' },
      { name: 'Expectorant (Guaifenesin)', dosage: '200mg', frequency: '3 lần/ngày', duration: '7 ngày' }
    ],
    createdDate: '2026-01-18',
    status: 'active',
    notes: 'Uống đủ nước. Nghỉ ngơi. Tránh khí lạnh, khí ô nhiễm.'
  },
  {
    id: '3',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Tiểu đường loại 2',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: '2 lần/ngày', duration: '30 ngày' },
      { name: 'Glibenclamide', dosage: '5mg', frequency: '2 lần/ngày', duration: '30 ngày' },
      { name: 'Insulin Glargine', dosage: '10 IU', frequency: '1 lần/tối', duration: '30 ngày' }
    ],
    createdDate: '2026-01-12',
    status: 'active',
    notes: 'Kiểm tra đường huyết hàng ngày. Ăn đúng giờ, đủ chất.'
  },
  {
    id: '4',
    patientId: 'BN003',
    patientName: 'Lê Văn Cường',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    diagnosis: 'Viêm dạ dày cấp',
    medications: [
      { name: 'Omeprazole', dosage: '20mg', frequency: '1 lần/sáng', duration: '14 ngày' },
      { name: 'Ranitidine', dosage: '150mg', frequency: '2 lần/ngày', duration: '14 ngày' },
      { name: 'Bismuth Subsalicylate', dosage: '30ml', frequency: '3 lần/ngày sau ăn', duration: '7 ngày' }
    ],
    createdDate: '2026-01-20',
    status: 'active',
    notes: 'Ăn cơm nát, canh. Tránh cay, mỡ. Uống nước ấm.'
  },
  {
    id: '5',
    patientId: 'BN004',
    patientName: 'Phạm Thị Dung',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Thoái hóa đốt sống cổ',
    medications: [
      { name: 'Ibuprofen', dosage: '400mg', frequency: '2 lần/ngày', duration: '14 ngày' },
      { name: 'Muscle Relaxant (Tizanidine)', dosage: '2mg', frequency: '2 lần/ngày', duration: '14 ngày' },
      { name: 'Vitamin B12', dosage: '1000mcg', frequency: '1 lần/tuần (tiêm)', duration: '4 tuần' }
    ],
    createdDate: '2026-01-10',
    status: 'active',
    notes: 'Vật lý trị liệu 3 lần/tuần. Tránh chuyển động bất thường. Ngủ gối cao.'
  },
  {
    id: '6',
    patientId: 'BN005',
    patientName: 'Hoàng Minh Tuấn',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    diagnosis: 'Thiếu máu do thiếu sắt',
    medications: [
      { name: 'Ferrous Sulfate', dosage: '325mg', frequency: '1 lần/ngày tối', duration: '30 ngày' },
      { name: 'Folic Acid', dosage: '1mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { name: 'Vitamin B12', dosage: '500mcg', frequency: '1 lần/ngày', duration: '30 ngày' }
    ],
    createdDate: '2026-01-17',
    status: 'active',
    notes: 'Uống với nước cam để tăng hấp thu. Tránh cà phê. Ăn gan, thịt đỏ, rau xanh.'
  },
  {
    id: '7',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Bệnh tim mạch vành',
    medications: [
      { name: 'Aspirin', dosage: '75mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { name: 'Atenolol', dosage: '50mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { name: 'Atorvastatin', dosage: '20mg', frequency: '1 lần/tối', duration: '30 ngày' },
      { name: 'Nitroglycerin', dosage: '0.6mg', frequency: 'Khi cần (dưới lưỡi)', duration: 'Theo cần' }
    ],
    createdDate: '2026-01-14',
    status: 'active',
    notes: 'Bỏ thuốc lá. Tránh stress. Tập thể dục nhẹ. Tái khám mỗi tháng.'
  },
  {
    id: '8',
    patientId: 'BN002',
    patientName: 'Trần Thị Bình',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    diagnosis: 'Bệnh mụn rộp',
    medications: [
      { name: 'Acyclovir', dosage: '400mg', frequency: '5 lần/ngày', duration: '10 ngày' },
      { name: 'Acyclovir Cream', dosage: '5%', frequency: 'Thoa 4-6 lần/ngày', duration: '10 ngày' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Mỗi 4-6 giờ nếu cần', duration: '5 ngày' }
    ],
    createdDate: '2026-01-16',
    status: 'active',
    notes: 'Rửa tay sạch trước/sau khi sử dụng thuốc. Không chạm vào vết thương.'
  },
  {
    id: '9',
    patientId: 'BN003',
    patientName: 'Lê Văn Cường',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    diagnosis: 'Bệnh dạ dày thở mạn tính',
    medications: [
      { name: 'Pantoprazole', dosage: '40mg', frequency: '1 lần/sáng', duration: '30 ngày' },
      { name: 'Domperidone', dosage: '10mg', frequency: '3 lần/ngày trước ăn', duration: '30 ngày' },
      { name: 'Antacid (Aluminum Hydroxide)', dosage: '30ml', frequency: '2 lần/ngày sau ăn', duration: '30 ngày' }
    ],
    createdDate: '2026-01-13',
    status: 'active',
    notes: 'Ăn từng bữa nhỏ, thường xuyên. Tránh cay, dầu mỡ. Ăn chậm, nhai kỹ.'
  },
  {
    id: '10',
    patientId: 'BN004',
    patientName: 'Phạm Thị Dung',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Viêm khớp dạng thấp',
    medications: [
      { name: 'Methotrexate', dosage: '15mg', frequency: '1 lần/tuần', duration: '12 tuần' },
      { name: 'Etanercept', dosage: '25mg', frequency: 'Tiêm 2 lần/tuần', duration: '12 tuần' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: '3 lần/ngày', duration: '30 ngày' }
    ],
    createdDate: '2026-01-19',
    status: 'active',
    notes: 'Vật lý trị liệu hàng ngày. Giữ ấm khớp. Tránh lao động nặng. Tái khám mỗi tháng.'
  }
];

export const sampleExaminations = [
  {
    id: 'exam_1',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Huyết áp cao (Hypertension)',
    symptoms: 'Đau đầu, chóng mặt, căng cơ cảnh',
    findings: 'Huyết áp: 160/100 mmHg, Nhịp tim: 85 lần/phút',
    treatment: 'Kiểm soát chế độ ăn, uống 2L nước/ngày, tập thể dục 30 phút/ngày',
    notes: 'Bệnh nhân cần tái khám sau 2 tuần',
    status: 'completed',
    examinationDate: '2026-01-15'
  },
  {
    id: 'exam_2',
    patientId: 'BN002',
    patientName: 'Trần Thị Bình',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    diagnosis: 'Viêm đường hô hấp cấp',
    symptoms: 'Ho, sốt cao, khó thở',
    findings: 'Nhiệt độ: 38.5°C, Tiếng ran ở phổi, CXR: viêm phổi khu trú',
    treatment: 'Dùng kháng sinh, ở yên và giữ ấm',
    notes: 'Theo dõi nhiệt độ, uống nhiều nước',
    status: 'completed',
    examinationDate: '2026-01-14'
  },
  {
    id: 'exam_3',
    patientId: 'BN003',
    patientName: 'Lê Văn Cường',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    diagnosis: 'Tiểu đường loại 2',
    symptoms: 'Khát nước, tiểu nhiều, mệt mỏi',
    findings: 'Đường huyết: 250 mg/dL, HbA1c: 8.5%',
    treatment: 'Dùng Metformin 500mg x 2/ngày, kiểm soát chế độ ăn',
    notes: 'Tái khám hàng tháng, kiểm tra đường huyết định kỳ',
    status: 'completed',
    examinationDate: '2026-01-13'
  },
  {
    id: 'exam_4',
    patientId: 'BN004',
    patientName: 'Phạm Thị Dung',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Viêm dạ dày cấp',
    symptoms: 'Đau bụng, buồn nôn, ăn uống kém',
    findings: 'Đau vùng thượng vị, nôn mửa, pH dạ dày cao',
    treatment: 'Omeprazole 20mg/ngày, ăn loãng, tránh thực phẩm kích thích',
    notes: 'Cần nội soi sau 3 tuần nếu không cải thiện',
    status: 'pending',
    examinationDate: '2026-01-12'
  },
  {
    id: 'exam_5',
    patientId: 'BN005',
    patientName: 'Hoàng Minh Tuấn',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    diagnosis: 'Thoái hóa đốt sống cổ',
    symptoms: 'Đau cổ, tê tay, hạn chế gập cơ',
    findings: 'MRI: thoái hóa C5-C6, chèn ép tủy sống nhẹ',
    treatment: 'Vật lý trị liệu, dùng NSAIDs, giữ tư thế đúng',
    notes: 'Theo dõi triệu chứng, có thể cần phẫu thuật nếu nặng',
    status: 'completed',
    examinationDate: '2026-01-11'
  },
  {
    id: 'exam_6',
    patientId: 'BN006',
    patientName: 'Vũ Thị Lan',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    diagnosis: 'Thiếu máu do thiếu sắt',
    symptoms: 'Mệt mỏi, yếu, đầu hoa mắt',
    findings: 'Hemoglobin: 8.5 g/dL, Ferritin: 20 ng/mL',
    treatment: 'Bổ sung sắt 325mg/ngày, ăn thực phẩm giàu sắt',
    notes: 'Xét nghiệm lại sau 6 tuần',
    status: 'completed',
    examinationDate: '2026-01-10'
  },
  {
    id: 'exam_7',
    patientId: 'BN007',
    patientName: 'Đặng Văn Hùng',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Bệnh tim mạch vành',
    symptoms: 'Đau ngực, hụt hơi, khi vận động',
    findings: 'ECG: thiếu máu cơ tim, chuỗi nồng độ Troponin tăng',
    treatment: 'Aspirin, Beta-blocker, Statin, theo dõi sát',
    notes: 'Nằm viện theo dõi 3 ngày',
    status: 'completed',
    examinationDate: '2026-01-09'
  },
  {
    id: 'exam_8',
    patientId: 'BN008',
    patientName: 'Bùi Thị Mai',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    diagnosis: 'Bệnh mụn rộp',
    symptoms: 'Phát ban, nốt sưng, đau rát',
    findings: 'Phát ban sủi nước ở vùng thấp hơn, test Tzanck dương tính',
    treatment: 'Acyclovir 400mg x 5/ngày, thoa kem Acyclovir',
    notes: 'Cách ly để tránh lây nhiễm, tái khám sau 1 tuần',
    status: 'pending',
    examinationDate: '2026-01-08'
  },
  {
    id: 'exam_9',
    patientId: 'BN009',
    patientName: 'Phan Văn Quang',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    diagnosis: 'Chấn thương đầu nhẹ',
    symptoms: 'Đau đầu, chóng mặt nhẹ, buồn ngủ',
    findings: 'CT scan không có máu tụ, bệnh nhân tỉnh táo, phản xạ bình thường',
    treatment: 'Theo dõi, uống thuốc giảm đau, tránh hoạt động nặng',
    notes: 'Bệnh nhân có thể về nhà, tái khám nếu triệu chứng xấu hơn',
    status: 'completed',
    examinationDate: '2026-01-07'
  },
  {
    id: 'exam_10',
    patientId: 'BN010',
    patientName: 'Đỗ Thị Hạnh',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    diagnosis: 'Viêm khớp dạng thấp',
    symptoms: 'Đau khớp tay, sưng, cứng buổi sáng',
    findings: 'ESR: 45 mm/h, CRP: 25 mg/L, x-quang: thoái hóa nhẹ',
    treatment: 'Methotrexate 15mg/tuần, Etanercept tiêm 2 lần/tuần',
    notes: 'Vật lý trị liệu hàng ngày, tái khám mỗi tháng',
    status: 'completed',
    examinationDate: '2026-01-06'
  }
];

export const samplePayments = [
  {
    id: 'INV001',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    patientPhone: '0912345678',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    amount: 850000,
    service: 'Khám tim mạch',
    paymentMethod: 'Tiền mặt',
    paymentDate: '2026-01-15',
    dueDate: '2026-01-15',
    status: 'paid'
  },
  {
    id: 'INV002',
    patientId: 'BN002',
    patientName: 'Trần Thị Bình',
    patientPhone: '0987654321',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    amount: 650000,
    service: 'Khám nhi khoa + Xét nghiệm',
    paymentMethod: 'Thẻ tín dụng',
    paymentDate: '2026-01-18',
    dueDate: '2026-01-20',
    status: 'paid'
  },
  {
    id: 'INV003',
    patientId: 'BN003',
    patientName: 'Lê Văn Cường',
    patientPhone: '0909123123',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    amount: 1200000,
    service: 'Phẫu thuật ngoại khoa + Nằm viện 3 ngày',
    paymentMethod: 'Bảo hiểm y tế',
    paymentDate: null,
    dueDate: '2026-01-25',
    status: 'pending'
  },
  {
    id: 'INV004',
    patientId: 'BN004',
    patientName: 'Phạm Thị Dung',
    patientPhone: '0911000001',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    amount: 750000,
    service: 'Tái khám + Thay thuốc',
    paymentMethod: 'Chuyển khoản',
    paymentDate: '2026-01-10',
    dueDate: '2026-01-16',
    status: 'paid'
  },
  {
    id: 'INV005',
    patientId: 'BN005',
    patientName: 'Hoàng Minh Tuấn',
    patientPhone: '0910000000',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    amount: 920000,
    service: 'Khám tổng quát + Siêu âm',
    paymentMethod: 'Tiền mặt',
    paymentDate: null,
    dueDate: '2026-01-22',
    status: 'overdue'
  },
  {
    id: 'INV006',
    patientId: 'BN006',
    patientName: 'Vũ Thị Lan',
    patientPhone: '091001234',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    amount: 580000,
    service: 'Khám sơ bộ',
    paymentMethod: 'Tiền mặt',
    paymentDate: '2026-01-20',
    dueDate: '2026-01-20',
    status: 'paid'
  },
  {
    id: 'INV007',
    patientId: 'BN007',
    patientName: 'Đặng Văn Hùng',
    patientPhone: '091002468',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    amount: 1100000,
    service: 'Điều trị nội khoa 5 ngày',
    paymentMethod: 'Bảo hiểm y tế',
    paymentDate: null,
    dueDate: '2026-01-23',
    status: 'pending'
  },
  {
    id: 'INV008',
    patientId: 'BN008',
    patientName: 'Bùi Thị Mai',
    patientPhone: '091003702',
    doctorId: 'BS002',
    doctorName: 'Dr. Phạm Mạnh Dũng',
    amount: 420000,
    service: 'Tiêm vaccin + Khám',
    paymentMethod: 'Thẻ tín dụng',
    paymentDate: '2026-01-19',
    dueDate: '2026-01-19',
    status: 'paid'
  },
  {
    id: 'INV009',
    patientId: 'BN009',
    patientName: 'Phan Văn Quang',
    patientPhone: '091004936',
    doctorId: 'BS003',
    doctorName: 'Dr. Vũ Quốc Thái',
    amount: 890000,
    service: 'Phẫu thuật ngoại khoa',
    paymentMethod: 'Chuyển khoản',
    paymentDate: null,
    dueDate: '2026-01-18',
    status: 'overdue'
  },
  {
    id: 'INV010',
    patientId: 'BN010',
    patientName: 'Đỗ Thị Hạnh',
    patientPhone: '091006170',
    doctorId: 'BS001',
    doctorName: 'Dr. Trần Hữu Bình',
    amount: 750000,
    service: 'Khám ngoại trú + Xét nghiệm',
    paymentMethod: 'Tiền mặt',
    paymentDate: '2026-01-21',
    dueDate: '2026-01-21',
    status: 'paid'
  }
];

export const sampleAccounts = [
  {
    id: '698c1b15b3aa62886000f1c1',
    name: 'Đỗ Quyên',
    email: 'doquyen@gmail.com',
    phone: '0123456789',
    role: 'Y tá',
    department: 'Tim mạch',
    gender: 'Nữ',
    dateOfBirth: '03/07/2000',
    status: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2026-02-11 08:30'
  },
  {
    id: 'TK002',
    name: 'Trần Văn Minh',
    email: 'minh.tran@hospital.vn',
    phone: '0987654321',
    role: 'Y tá',
    department: 'Nhi khoa',
    status: 'active',
    joinDate: '2024-03-20',
    lastLogin: '2026-02-11 07:45'
  },
  {
    id: 'TK003',
    name: 'Lê Thị Thanh',
    email: 'thanh.le@hospital.vn',
    phone: '0909123123',
    role: 'Tiếp tân',
    department: 'Hành chính',
    status: 'active',
    joinDate: '2024-02-10',
    lastLogin: '2026-02-11 09:15'
  },
  {
    id: 'TK004',
    name: 'Phạm Văn Tuấn',
    email: 'tuan.pham@hospital.vn',
    phone: '0911000001',
    role: 'Bác sĩ',
    department: 'Ngoại khoa',
    status: 'active',
    joinDate: '2023-06-05',
    lastLogin: '2026-02-10 18:00'
  },
  {
    id: 'TK005',
    name: 'Vũ Thị Hà',
    email: 'ha.vu@hospital.vn',
    phone: '0910000000',
    role: 'Y tá',
    department: 'Tim mạch',
    status: 'inactive',
    joinDate: '2024-04-12',
    lastLogin: '2026-01-28 16:20'
  },
  {
    id: 'TK006',
    name: 'Đặng Văn Sơn',
    email: 'son.dang@hospital.vn',
    phone: '091001234',
    role: 'Bác sĩ',
    department: 'Nhi khoa',
    status: 'active',
    joinDate: '2023-09-15',
    lastLogin: '2026-02-11 08:00'
  },
  {
    id: 'TK007',
    name: 'Bùi Thị Liên',
    email: 'lien.bui@hospital.vn',
    phone: '091002468',
    role: 'Y tá',
    department: 'Ngoại khoa',
    status: 'active',
    joinDate: '2024-05-20',
    lastLogin: '2026-02-11 09:45'
  },
  {
    id: 'TK008',
    name: 'Hoàng Văn Công',
    email: 'cong.hoang@hospital.vn',
    phone: '091003702',
    role: 'Quản trị viên',
    department: 'Hành chính',
    status: 'active',
    joinDate: '2023-01-20',
    lastLogin: '2026-02-11 09:30'
  },
  {
    id: 'TK009',
    name: 'Phan Thị Mộng',
    email: 'mong.phan@hospital.vn',
    phone: '091004936',
    role: 'Y tá',
    department: 'Nhi khoa',
    status: 'inactive',
    joinDate: '2024-07-10',
    lastLogin: '2026-02-05 14:10'
  },
  {
    id: 'TK010',
    name: 'Đỗ Văn Kiên',
    email: 'kien.do@hospital.vn',
    phone: '091006170',
    role: 'Bác sĩ',
    department: 'Tim mạch',
    status: 'active',
    joinDate: '2023-08-25',
    lastLogin: '2026-02-11 10:00'
  }
];
