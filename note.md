setState là 1 hàm bất đồng bộ
this.setState({
...copyState,
}, () => console.log(this.state));

- Trình tự sử dụng redux:

2. Vào file actionTypes, khai báo tên action
3. vào file action chính, khai báo hàm
4. Tạo file reducer, sau đó vào rootReducer để export
5. Vào file reducer đã khai báo để viết logic
6. lấy action ở mapDispatchToProps sau đó Fire action ở đimmount trong commponent
7. Lấy data ở mapStateToProps sau đó dùng componentDidUpdate để setState -> render

Trong componentDidUpdate,ta kiểm tra sự thay đổi của state trong react, sau đó update -> re-render

Hàm mapStateToProps và mapDispatchToProps là redux truyền data và action cho react, tiêm vào props thông qua hàm connect của thư viện react-redux

- framework:

* Emitter: Dùng để fire event qua lại giữa compenent cha và con, emitter.emeit dùng để fire, emitter.on dùng để khai báo event
* reactstrap: Dùng bootrap trong reactjs
* axios: Gọi API
* react-markdown-editor-lite , markdown-it: soạn thảo văn bản
* react-faltpickr/ react-datepicker: Sử dụng Datetimepicker
* moment: format lại định dạng ngày tháng: How to use: moment.(yourValue).format('DD/MM/YYYY)
* moment(new Date()).add(i, "days").startOf("day").valueOf(): startOf("day): chỉ lấy ngày
* react-image-lightbox: preview ảnh
* lodash: Kiểm tra 1 obj hoặc arr có rỗng hay không
* <div dangerouslySetInnerHTML={{__html: ...}}></div> Render ra giao diện khi lấy đoạn HTML từ db

* <Route path="/users/:id" component={DetailDoctor} />: Nhận tham số id
* Lấy id: console.log(this.props.match.params.id);

* Encode file -> base64:
  let data = event.target.files;
  let file = data[0];
  if (file) {
  let base64 = await CommonUtils.getBase64(file);
  let objectUrl = URL.createObjectURL(file);
  this.setState({
  previewImgURL: objectUrl,
  avatar: base64,
  });
  }

* Decode blob from db to base64:
  let imageBase64 = "";
  if (user.image) {
  imageBase64 = new Buffer(user.image, "base64").toString("binary");
  }
