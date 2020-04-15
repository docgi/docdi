<template>
  <div class="d-flex justify-center">
    <div class="col-12 col-md-10 col-lg-6 pa-0">
      <editor-content :editor="editor"/>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';

export default {
  name: "Typing",
  components: {
    EditorContent
  },
  data() {
    return {
      editable: false,
      editor: new Editor({
        editable: false,
        content: 'Tại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần ' +
          'Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên ' +
          'quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 ' +
          'trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôi (xã Mê Linh, huyện Mê Linh,' +
          ' Hà Nội). Đến nay, ổ dịch này đã có tổnTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôi (xã Mê Linh, huyện Mê Linh, Hà Nội). Đến nay, ổ dịch này đã có tổng cộng 8 trường hợp nhiễm SARS-CoV-2. Đánh giá về ổ dịch tại Hạ Lôi, các chuyên gia cho rằng khu vực này có nhiều yếu tố khiến dịch bệnh diễn biến tại đây rất phức tạp, khó lường. Tương đồng về mặt dân cư (xấp xỉ 11.000 dân), nhưng việc dập dịch ở thôn Hạ Lôi sẽ mất nhiều thời gian, công sức hơn so với ở xã Sơn Lôi (huyện Bình Xuyên, Vĩnh PhúcTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ LTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôi (xã Mê Linh, huyện Mê Linh, Hà Nội). Đến nay, ổ dịch này đã có tổng cộng 8 trường hợp nhiễm SARS-CoV-2. Đánh giá về ổ dịch tại Hạ Lôi, các chuyên gia cho rằng khu vực này có nhiều yếu tố khiến dịch bệnh diễn biến tại đây rất phức tạp, khó lường. Tương đồng về mặt dân cư (xấp xỉ 11.000 dân), nhưng việc dập dịch ở thôn Hạ Lôi sẽ mất nhiều thời gian, công sức hơn so với ở xã Sơn Lôi (huyện Bình Xuyên, Vĩnh PhúcTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ LôiTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôi (xã Mê Linh, huyện Mê Linh, Hà Nội). Đến nay, ổ dịch này đã có tổng cộng 8 trường hợp nhiễm SARS-CoV-2. Đánh giá về ổ dịch tại Hạ Lôi, các chuyên gia cho rằng khu vực này có nhiều yếu tố khiến dịch bệnh diễn biến tại đây rất phức tạp, khó lường. Tương đồng về mặt dân cư (xấp xỉ 11.000 dân), nhưng việc dập dịch ở thôn Hạ Lôi sẽ mất nhiều thời gian, công sức hơn so với ở xã Sơn Lôi (huyện Bình Xuyên, Vĩnh PhúcTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôiôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôig cộng 8 trường hợp nhiễm SARS-CoV-2. Đánh giá về ổ dịch tại Hạ Lôi, các ' +
          'chuyên gia cho rằng khu vực này có nhiều yếu tố khiến dịch bệnh diễn biến tại đây rất phức tạp, khó lường. Tương' +
          ' đồng về mặt dân cư (xấp xỉ 11.000 dân), nhưng việc dập dịch ở thôn Hạ Lôi sẽ mất nhiều thời gian, công sức hơn ' +
          'so với ở xã Sơn Lôi (huyện Bình Xuyên, Vĩnh PhúcTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  ' +
          '19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ LTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôi (xã Mê Linh, huyện Mê Linh, Hà Nội). Đến nay, ổ dịch này đã có tổng cộng 8 trường hợp nhiễm SARS-CoV-2. Đánh giá về ổ dịch tại Hạ Lôi, các chuyên gia cho rằng khu vực này có nhiều yếu tố khiến dịch bệnh diễn biến tại đây rất phức tạp, khó lường. Tương đồng về mặt dân cư (xấp xỉ 11.000 dân), nhưng việc dập dịch ở thôn Hạ Lôi sẽ mất nhiều thời gian, công sức hơn so với ở xã Sơn Lôi (huyện Bình Xuyên, Vĩnh PhúcTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ LôiTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôi (xã Mê Linh, huyện Mê Linh, Hà Nội). Đến nay, ổ dịch này đã có tổng cộng 8 trường hợp nhiễm SARS-CoV-2. Đánh giá về ổ dịch tại Hạ Lôi, các chuyên gia cho rằng khu vực này có nhiều yếu tố khiến dịch bệnh diễn biến tại đây rất phức tạp, khó lường. Tương đồng về mặt dân cư (xấp xỉ 11.000 dân), nhưng việc dập dịch ở thôn Hạ Lôi sẽ mất nhiều thời gian, công sức hơn so với ở xã Sơn Lôi (huyện Bình Xuyên, Vĩnh PhúcTại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi? Sơn Hà  19:11 12/04/2020 13 Theo PGS.TS Trần Đắc Phu, ổ dịch tại thôn Hạ Lôi hiện không xác định được nguồn lây (F0), các bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôiôi hiện không xác định được nguồn lây (F0), các' +
          ' bệnh nhân đi nhiều nơi, liên quan đến nhiều bệnh viện lớn tại Hà Nội. Chiều 12/4, Ban chỉ đạo Phòng chống dịch ' +
          'quốc gia thông báo thêm 2 trường hợp dương tính với Covid-19. Bệnh nhân 259 và 260 đều cư trú ở thôn Hạ Lôi'})
    }
  },
  watch: {
    editable() {
      this.editor.setOptions({
        editable: this.editable
      })
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>
.editor {
  width: 60em;
}
</style>
