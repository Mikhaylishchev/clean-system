// Генерируем или достаем ID сессии (живет, пока не очистят кэш)
let currentSessionId = localStorage.getItem('service_session_id');
if (!currentSessionId) {
    currentSessionId = 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    localStorage.setItem('service_session_id', currentSessionId);
}

// Функция для сохранения введенных данных "на лету"
function saveDraftData() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    if (name) localStorage.setItem('draft_name', name);
    if (phone) localStorage.setItem('draft_phone', phone);
}

// Вешаем прослушку на поля имени и телефона
document.getElementById('name').addEventListener('input', saveDraftData);
document.getElementById('phone').addEventListener('input', saveDraftData);


// 0. Анимации при скролле
        document.addEventListener("DOMContentLoaded", () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target); 
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.reveal, .step-card, .price-card, .review-card').forEach(el => {
                el.classList.add('reveal');
                observer.observe(el);
            });

            switchForm('LIGHT');

            // 2. ПОДСТАВЛЯЕМ ДАННЫЕ, если они есть в памяти
            const savedName = localStorage.getItem('draft_name');
            const savedPhone = localStorage.getItem('draft_phone');
            
            // Подставляем только если поле пустое, чтобы не перезаписывать то, что юзер пишет прямо сейчас
            if (savedName && !document.getElementById('name').value) {
                document.getElementById('name').value = savedName;
            }
            if (savedPhone && !document.getElementById('phone').value) {
                document.getElementById('phone').value = savedPhone;
            }
        });

        // БАЗА ДАННЫХ
        const DATA = {
            gallery:[
                {
                    before: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&sat=-100&bri=-20",
                    after:  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                },
                {
                    // Третья пара
                    before: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&sat=-100&bri=-20",
                    after:  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                }
            ],
            prices: {
                sofas:[
                    { name: "Химчистка дивана", price: "от 1 400 ₽", time: "2 ч 30 мин" },
                    { name: "Угловой диван", price: "от 2 100 ₽", time: "2 ч" },
                    { name: "Двухместный диван", price: "от 2 000 ₽", time: "1 ч" },
                    { name: "Трёхместный диван", price: "от 2 500 ₽", time: "1 ч 45 мин" },
                    { name: "Четырёхместный диван", price: "от 3 000 ₽", time: "1 ч 45 мин" }
                ],
                mattresses:[
                    { name: "Химчистка матраса", price: "от 1 100 ₽", time: "2 ч 30 мин" },
                    { name: "Спинка кровати", price: "от 800 ₽", time: "1 ч" }
                ],
                chairs:[
                    { name: "Химчистка кресла", price: "от 700 ₽", time: "45 мин" },
                    { name: "Химчистка стула", price: "от 300 ₽", time: "30 мин" },
                ],
                other:[
                    { name: "Кожаная мебель", price: "от 1 200 ₽", time: "30 мин" },
                    { name: "Кухонный уголок", price: "от 1 300 ₽", time: "1 ч 15 мин" },
                    { name: "Удаление слаймов, маркеров", price: "от 350 ₽", time: "30 мин" },
                    { name: "Сушка мебели", price: "от 500 ₽", time: "1 ч" }
                ],
            },
            categories: { sofas: "Диваны", mattresses: "Кровати и матрасы", chairs: "Кресла и стулья", other: "Другое" },
            steps:[
                { title: "Обеспыливание", desc: "Глубокая сухая чистка мощным профессиональным пылесосом." },
                { title: "Удаление пятен", desc: "Локальное выведение водонерастворимых и сложных пятен." },
                { title: "Нанесение химии", desc: "Равномерное нанесение и выдержка основного чистящего состава." },
                { title: "Ополаскивание", desc: "Экстракторная чистка с вытягиванием грязи из глубины ткани." },
                { title: "Нейтрализация", desc: "Обработка кислотным ополаскивателем для удаления остатков химии." },
                { title: "Финиш и Сушка", desc: "Финальное ополаскивание и, при необходимости, принудительная сушка." }
            ],
            reviews:[
                { name: "Марианна", text: "Очень вежливый, аккуратный мастер. Сделал свою работу на 5+. Рекомендую", date: "31 марта", avatarURL: "https://90.img.avito.st/image/1/1.IAPcxLaxmuoOA3Rj77IG6WplhuAOA47o.om50WOaxYba4wPxZ5lwky2nunZMo5TEbtsboMM6w5YY" },
                { name: "Алмазовна", text: "Работа сделана качественно, быстро Диванчик как новый 🆕 Рекомендую 😻", date: "25 марта", avatarURL: "https://90.img.avito.st/image/1/1.Bts_SLaxvDLtjx7rDywSMonpoDjtj6gw.cp0i2ee06XH2M3TnYT-n__1ePa6_spc8gqXmoPJcfYM" },
                { name: "АА", text: "Работа выполнена хорошо, пунктуальный. Рекомендую", date: "21 марта", avatarURL: "https://static.avito.ru/stub_avatars/%D0%90/2_48x48.png" },
                { name: "UMRUD", text: "Быстро договорились. Качественно почистил, диван как новый. Обратимся еще, спасибо!", date: "13 марта", avatarURL: "https://60.img.avito.st/image/1/1.bRTm97ax1_00MCMhyeUs_VBWy_c0MMP_.SGYyeUWOzjqDJ-Xz23iUirzTuaA_94VzFRWtXOEAWhA" },
                { name: "Ольга", text: "Работа выполнена качественно, спасибо Сергею. Цена = качество однозначно. ✅ Будем обращаться еще", date: "10 марта", avatarURL: "https://40.img.avito.st/image/1/1.GUYB3raxo6_TGT82JN1mr7d_v6XTGbet.5-d61sh3agjJMXQ4HWNIB-GOCR9ewYLx9xuLDbEAZU4"  },
                /* { name: "Василий", text: "Все отлично, быстро договорились, прибыл точно в срок. Работа выполнена качественно, рекомендую!", date: "10 марта", avatarURL: "https://static.avito.ru/stub_avatars/%D0%92/2_48x48.png"  }, */
                { name: "Анастасия Хар", text: "Замечательный мастер! Сразу ответил на сообщение, сразу подобрали удобное время. Приехал вовремя, всё подробно объяснил, очень вежливый и приятный человек!! Диван как новый🔥 Работа качественная, потом даже подарочек от мастера получили)", date: "9 марта", avatarURL: "https://static.avito.ru/stub_avatars/%D0%90/2_48x48.png"  },
                { name: "Данила", text: "В мире можно потерять всё, но нельзя потерять номер этого человека. Повезло тем кто обратился к этому мастеру с самого начала — это можно назвать удачей.", date: "7 марта", avatarURL: "https://10.img.avito.st/image/1/1.r-tI-LaxFQKaP-XBTpONAf5ZCQiaPwEA.6RYurekKsJ-XFA-KezGZR7Iyx7a_K3FcnevUpryZJC0?cqp=2.pGdjs5fBvl5-fB-fm84xxYDAkt8GM2Wgr1fOyxua9Q=="  },
                { name: "Елена", text: "Сергей , спасибо Вам большое за безупречную чистоту 🙏Вы настоящий профи . Быстро, качественно и недорого реабилитировали убитые кухонные кресла до состояния новой мебели . Отдельная благодарность за пунктуальность и ответственность, очень оценила, буду рекомендовать всем.", date: "6 марта", avatarURL: "https://80.img.avito.st/image/1/1.5RoHQLaxX_PVh7t1SU-Y87HhQ_nVh0vx.oe0twNXjKA1P_fa9vuZz18PISWE8nfw0hNWgWNkvddI"  },/* 
                { name: "Частное лицо", text: "Отличный мастер👍пунктуальный, вежливый ,аккуратный, чистка матраса произведена качественно👌никаких нареканий нет, будем обращаться обязательно еще ! Однозначно ромендую!", date: "3 марта", avatarURL: "https://50.img.avito.st/image/1/1.bZhzlbax13GhUiOdSZ5mcsU0y3uhUsNz.lAUTRkJ8oV2lmJcZXNc6y1BsOCaUHqoLjjJ8Z1o0wpU"  }, */
            ]
        };

        // РЕНДЕР КАРУСЕЛИ
        const track = document.getElementById('carousel-track');
        DATA.gallery.forEach((pair, index) => {
            track.innerHTML += `
                <div class="carousel-slide comparison-slider">
                    <img src="${pair.after}" alt="После" class="image-after">
                    <img src="${pair.before}" alt="До" class="slider-before" id="img-before-${index}">
                    <div class="badge-img badge-before">ДО</div>
                    <div class="badge-img badge-after">ПОСЛЕ</div>
                    <div class="slider-handle" id="handle-${index}"></div>
                    <input type="range" min="0" max="100" value="50" class="slider-input" data-index="${index}">
                </div>
            `;
        });

        document.querySelectorAll('.slider-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const val = e.target.value; const idx = e.target.getAttribute('data-index');
                document.getElementById(`img-before-${idx}`).style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
                document.getElementById(`handle-${idx}`).style.left = `${val}%`;
            });
        });

        let currentSlide = 0;
        function updateCarousel() { track.style.transform = `translateX(-${currentSlide * 100}%)`; }
        document.getElementById('btn-next').addEventListener('click', () => { currentSlide = currentSlide < DATA.gallery.length - 1 ? currentSlide + 1 : 0; updateCarousel(); });
        document.getElementById('btn-prev').addEventListener('click', () => { currentSlide = currentSlide > 0 ? currentSlide - 1 : DATA.gallery.length - 1; updateCarousel(); });

        // РЕНДЕР ТАБОВ
        const tabsContainer = document.getElementById('tabs-container');
        const pricesContainer = document.getElementById('prices-container');
        let isFirstTab = true;
        for (const[key, label] of Object.entries(DATA.categories)) {
            const btn = document.createElement('button');
            btn.className = `tab-btn ${isFirstTab ? 'active' : ''}`; btn.textContent = label;
            btn.onclick = () => switchTab(key, btn); tabsContainer.appendChild(btn);

            const grid = document.createElement('div');
            grid.className = `price-grid ${isFirstTab ? 'active' : ''}`; grid.id = `tab-${key}`;
            DATA.prices[key].forEach((item, i) => {
                grid.innerHTML += `<div class="price-card" style="transition-delay: ${i*0.05}s"><div class="price-info"><h4>${item.name}</h4><p  title="Примерное время выполнения работ"><span class="price-info-icon">⏱</span> ${item.time}</p></div><div class="price-value">${item.price}</div></div>`;
            });
            pricesContainer.appendChild(grid); isFirstTab = false;
        }
        function switchTab(tabId, btnElement) {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.price-grid').forEach(g => g.classList.remove('active'));
            btnElement.classList.add('active'); document.getElementById(`tab-${tabId}`).classList.add('active');
        }

        // РЕНДЕР ЭТАПОВ И ОТЗЫВОВ
        const stepsContainer = document.getElementById('steps-container');
        DATA.steps.forEach((step, index) => {
            stepsContainer.innerHTML += `<div class="step-card reveal delay-${index%3+1}" data-num="0${index + 1}"><h4>${step.title}</h4><p>${step.desc}</p></div>`;
        });

        const reviewsContainer = document.getElementById('reviews-container');
        DATA.reviews.forEach((rev, i) => {
            reviewsContainer.innerHTML += `<div class="review-card reveal delay-${i%3+1}"><div><div class="stars">★★★★★</div><p class="review-text">"${rev.text}"</p></div><div class="review-footer">
                <div class="avatar"><img src="${rev.avatarURL}"/></div><div class="reviewer-info">
                    <h5 style="font-size: 16px; font-weight: 700;">${rev.name}</h5><span style="font-size: 13px; color: var(--text-light);">${rev.date}</span></div></div></div>`;
        });

        /** =================== ЛОГИКА ФОРМЫ ===================== **/
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyWUbzKxrh9pf4rol78ZxXVH3pHvx-1iI-OAbFPbptwMXW5oWRecHUed43GLsEwRmUu/exec';
        // ================================================================
        // БЕЗОПАСНОСТЬ: ТОКЕН DADATA (API KEY)
        // Если подсказки адреса перестали работать:
        // 1. Проверь лимиты в кабинете dadata.ru
        // 2. Если ключ украли — обнови его в кабинете, скопируй новый 
        //    и зашифруй через любой сервис "Base64 Encode"
        // ================================================================

        const _encodedToken = "NTA5M2Y4OTgwNDViZGUwYzM3NmFmYTFjOWE5NmU3MzhjNDU0OWJlNg==";

        const API_TOKEN = atob(_encodedToken); 

        // ================================================================
        
        const form = document.getElementById('order-form');
        const status = document.getElementById('status');
        const btn = document.getElementById('submit-btn');
        const dateInput = document.getElementById('order-date');
        const hourSelect = document.getElementById('hours');
        const addressInput = document.getElementById('address');
        const suggestionsBox = document.getElementById('address-suggestions');
        const pageLoadTime = Date.now();

        const fileInput = document.getElementById('image');
        const fileLabel = document.getElementById('file-label');

        // Создаем контейнер для миниатюр сразу под блоком загрузки
const previewContainer = document.createElement('div');
previewContainer.className = 'preview-container';
fileInput.closest('.file-upload-wrapper').after(previewContainer);

let selectedFiles =[]; // Наш умный массив для хранения фото
const MAX_FILES = 3;    // Максимальное количество фото

fileInput.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    
    // Добавляем новые фото в наш массив (но не больше MAX_FILES)
    files.forEach(file => {
        if (selectedFiles.length < MAX_FILES && file.type.startsWith('image/')) {
            selectedFiles.push(file);
        }
    });

    // Очищаем скрытый input, чтобы можно было загрузить те же фото заново, если их удалят
    fileInput.value = ''; 

    renderPreviews();
});

// Функция отрисовки миниатюр
function renderPreviews() {
    previewContainer.innerHTML = ''; // Очищаем контейнер

    if (selectedFiles.length > 0) {
        // Обновляем текст на кнопке
        fileLabel.innerHTML = `<span class="file-icon" style="color:var(--primary)">✅</span><span style="color:var(--primary); font-weight:700;">Фото добавлены: ${selectedFiles.length} из ${MAX_FILES}</span>`;
        fileLabel.style.borderColor = 'var(--primary)';

        // Рисуем каждую фотографию
        selectedFiles.forEach((file, index) => {
            const objectUrl = URL.createObjectURL(file); // Быстро создаем ссылку на картинку в памяти
            
            const div = document.createElement('div');
            div.className = 'preview-item';
            div.innerHTML = `
                <img src="${objectUrl}" alt="Фото мебели">
                <button type="button" class="preview-remove" data-index="${index}">✖</button>
            `;
            previewContainer.appendChild(div);

            // Вешаем обработчик на крестик (удаление фото)
            div.querySelector('.preview-remove').addEventListener('click', function() {
                selectedFiles.splice(index, 1); // Удаляем из массива
                renderPreviews(); // Перерисовываем UI
            });
        });
    } else {
        // Возвращаем исходный вид, если фоток нет
        fileLabel.innerHTML = `<span class="file-icon">📸</span><span>Нажмите, чтобы выбрать до 3-х фото</span><span style="font-size: 13px; font-weight: 400; margin-top: 5px; opacity: 0.8;">(JPEG, PNG)</span>`;
        fileLabel.style.borderColor = '#cbd5e1';
    }
}


        const getLocalDateStr = () => new Date().toISOString().split('T')[0];

        async function updateAvailableHours() {
    const selectedDate = dateInput.value;
    if (!selectedDate) return;

    // 1. Запускаем анимацию загрузки (бегающие точки)
    let dots = "";
    const loadingInterval = setInterval(() => {
        dots = dots.length >= 3 ? "" : dots + ".";
        hourSelect.innerHTML = `<option value="">Загрузка${dots}</option>`;
    }, 400);

    try {
        const response = await fetch(`${scriptURL}?t=${Date.now()}`);
        const bookedSlots = await response.json();
        
        // 2. ОСТАНАВЛИВАЕМ таймер анимации, когда данные пришли!
        clearInterval(loadingInterval);
        hourSelect.innerHTML = '<option value="">Час</option>';
        
        const isFullDayBlocked = bookedSlots.some(slot => slot.date === selectedDate && slot.time === "Весь день");
        
        if (isFullDayBlocked) {
            const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
            const findNearby = (dir) => {
                let cur = new Date(selectedDate);
                for (let i = 1; i <= 10; i++) {
                    cur.setDate(cur.getDate() + dir);
                    let dateStr = cur.toISOString().split('T')[0];
                    let isBlocked = bookedSlots.some(s => s.date === dateStr && s.time === "Весь день");
                    let today = new Date(); today.setHours(0,0,0,0);
                    if (!isBlocked && cur >= today) return { raw: dateStr, nice: cur.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) };
                }
                return null;
            };
            const prev = findNearby(-1), next = findNearby(1);
            let advice = "<b>Ближайшие свободные даты:</b><br><div style='margin-top:15px; display:flex; gap:10px; justify-content:center;'>";
            if (prev) advice += `<button type="button" class="date-suggest-btn" onclick="selectSuggestedDate('${prev.raw}')">⬅️ ${prev.nice}</button>`;
            if (next) advice += `<button type="button" class="date-suggest-btn" onclick="selectSuggestedDate('${next.raw}')">${next.nice} ➡️</button>`;
            advice += "</div>";
            showModal("День занят", `К сожалению, на <b>${formattedSelectedDate}</b> запись невозможна.`, "error", advice);
            dateInput.value = ""; return;
        }

        const now = new Date(); const todayStr = getLocalDateStr(); const cutoffHour = now.getHours() + 2;
        for (let i = 8; i <= 20; i++) {
            let hStr = i.toString().padStart(2, '0');
            if (selectedDate > todayStr || i >= cutoffHour) {
                const isBooked = bookedSlots.some(slot => {
                    if (slot.date !== selectedDate) return false;
                    const bookedHour = parseInt(slot.time.split(':')[0]);
                    return (i >= bookedHour - 1 && i <= bookedHour + 1);
                });
                let opt = document.createElement('option');
                opt.value = hStr; opt.textContent = isBooked ? `${hStr} (занято)` : `${hStr}`;
                if (isBooked) { opt.disabled = true; opt.style.color = "#a0aec0"; }
                hourSelect.appendChild(opt);
            }
        }
        if (hourSelect.options.length <= 1) hourSelect.innerHTML = '<option value="">Нет свободных слотов</option>';
        
    } catch (e) { 
        // 3. ОСТАНАВЛИВАЕМ таймер, если произошла ошибка сети
        clearInterval(loadingInterval);
        hourSelect.innerHTML = '<option value="">Ошибка</option>'; 
        console.error("Ошибка загрузки слотов:", e);
    }
}

        // Автоматически ставим 00 при выборе часа (если пользователь еще не выбрал минуты)
        document.getElementById('hours').addEventListener('change', function() {
            if(this.value !== "") {
                document.getElementById('minutes').value = "00";
            } else {
                document.getElementById('minutes').value = "";
            }
        });

        function showModal(title, text, type = 'success', extraHtml = "", orderNum = "") {
    const modal = document.getElementById('orderModal'); // Было 'modal'
    const mTitle = document.getElementById('modal-title');
    const mText = document.getElementById('modal-text');
    const mIcon = document.getElementById('modal-icon');
    const mOrder = document.getElementById('displayOrderNum'); // Было 'modal-order-num'
    const mExtra = document.getElementById('modal-extra');

    if (!modal) {
        console.error("Ошибка: Элемент #orderModal не найден!");
        return;
    }

    if (mTitle) mTitle.textContent = title;
    if (mText) mText.textContent = text;
    if (mExtra) mExtra.innerHTML = extraHtml;

    if (mOrder) {
        if (orderNum) {
            mOrder.style.display = 'block';
            mOrder.innerHTML = `
                <span style="font-size: 14px; color: var(--text-light); font-weight: 400; display: block; margin-bottom: 5px;">
                    Номер вашей заявки:
                </span>
                <strong style="font-size: 32px; color: var(--primary); display: block; line-height: 1;">
                    ${orderNum}
                </strong>
            `;
        } else {
            mOrder.style.display = 'none';
        }
    }

    if (mIcon) {
        mIcon.innerHTML = (type === 'success') ? '✅' : '❌';
        mIcon.style.color = (type === 'success') ? '#04E061' : '#ff4d4d';
    }

    // Показываем окно
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

        // Универсальное закрытие
        function closeModal() {
            document.getElementById('orderModal').style.display = 'none';
            // Возвращаем прокрутку основному сайту
            document.body.style.overflow = '';
            
        }

        // Твоя функция выбора даты (теперь работает чисто)
        function selectSuggestedDate(dateIso) { 
            document.getElementById('order-date').value = dateIso; 
            closeModal(); // Здесь e не передается, так что сработает просто закрытие
            updateAvailableHours(); 
        }

        document.querySelector("#modal-btn").onclick = () => {
            closeModal()
        }
        // Закрытие по клавише Esc
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape") {
                // Проверяем, открыто ли окно в данный момент
                const modal = document.getElementById('orderModal');
                if (modal.style.display === 'flex') {
                    closeModal();
                }
            }
        });

        // Закрытие по клику на темный фон (но не по самому окну!)
        document.getElementById('orderModal').addEventListener('click', function(e) {
            // Если кликнули именно по оверлею (черному фону), а не по контенту внутри
            if (e.target === this) {
                closeModal();
            }
        });

        addressInput.addEventListener('input', async function() {
            if (this.value.length < 3) { suggestionsBox.style.display = 'none'; return; }
            try {
                const resp = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
                    method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Token " + API_TOKEN },
                    body: JSON.stringify({ query: this.value, count: 5, from_bound: {value: "street"}, to_bound: {value: "house"}, locations:[{"city": "Тюмень"}], restrict_value: true })
                });
                const res = await resp.json(); const filtered = res.suggestions.filter(s => s.data.street);
                suggestionsBox.innerHTML = '';
                filtered.forEach(s => {
                    const div = document.createElement('div'); div.className = 'suggestion-item'; div.textContent = s.value;
                    div.onclick = () => {
                        addressInput.value = s.value;
                        if (s.data.house) { suggestionsBox.style.display = 'none'; } 
                        else { addressInput.value += ", "; addressInput.focus(); addressInput.dispatchEvent(new Event('input')); }
                    };
                    suggestionsBox.appendChild(div);
                });
                suggestionsBox.style.display = filtered.length ? 'block' : 'none';
            } catch (e) { console.log(e); }
        });

        const getFilesData = async (files) => {
            const promises = Array.from(files).slice(0, 3).map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas'); let w = img.width, h = img.height; const MAX = 1200;
                            if (w > h && w > MAX) { h *= MAX/w; w = MAX; } else if (h > MAX) { w *= MAX/h; h = MAX; }
                            canvas.width = w; canvas.height = h; canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                            resolve({ data: canvas.toDataURL('image/jpeg', 0.7).split(',')[1], name: file.name });
                        };
                        img.src = e.target.result;
                    }; reader.readAsDataURL(file);
                });
            }); return Promise.all(promises);
        };

        form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentForm = e.target;
    const status = document.getElementById('status');
    const btn = document.getElementById('submit-btn');
    const typeEl = document.getElementById('form_type');
    const addressField = document.getElementById('address');
    const currentMode = typeEl ? typeEl.value : 'LIGHT';
    const isFull = (currentMode === 'FULL');

    // 1. Валидация фото (LIGHT)
    if (currentMode === 'LIGHT' && selectedFiles.length === 0) {
        alert("Пожалуйста, прикрепите хотя бы одно фото мебели, чтобы мастер мог оценить стоимость!");
        return;
    }

    // 2. Валидация адреса (FULL)
    if (currentMode === 'FULL' && addressField) {
        const addrValue = addressField.value.trim();
        if (!/[а-яА-ЯёЁa-zA-Z]/.test(addrValue) || !/\d/.test(addrValue)) {
            alert("Пожалуйста, введите точный адрес (улица и дом)!"); 
            addressField.focus(); 
            return;
        }
    }

    // 3. Антиспам
    const timePassed = (typeof pageLoadTime !== 'undefined') ? (Date.now() - pageLoadTime) : 5000;
    if (document.getElementById('honeypot').value || timePassed < 4000) return;

    // 4. Подготовка кнопки
    const originalBtnHTML = btn.innerHTML;
    btn.disabled = true; 
    btn.innerHTML = `<span class="spinner"></span> Отправка...`;
    
    status.style.color = "var(--primary)"; 
    status.textContent = "⏳ Соединение с сервером...";

    try {
        const formData = new FormData(currentForm);
        const data = Object.fromEntries(formData.entries());

        // Критически важные ID
        data.session_id = currentSessionId; // Берем из глобальной переменной
        data.form_type = currentMode;

        if (currentMode === 'LIGHT') {
            data.address = "Расчёт стоимости работы";
            data.date = "Не указана";
            data.time = "Не указано";
        } else {
            const addr = addressField.value;
            const flat = document.getElementById('flat').value;
            data.address = flat ? `${addr}, кв/оф: ${flat}` : addr;
            data.date = document.getElementById('order-date').value || "Не выбрана";
            data.time = `${document.getElementById('hours').value}:${document.getElementById('minutes').value}`;
        }

        if (selectedFiles.length > 0) {
            status.textContent = "📸 Обработка фото...";
            data.filesJSON = JSON.stringify(await getFilesData(selectedFiles));
        }

        status.textContent = "📡 Передача данных...";

        const bodyData = new URLSearchParams();
        for (const key in data) { bodyData.append(key, data[key]); }

        // ОТПРАВЛЯЕМ (no-cors)
        fetch(scriptURL, { 
            method: 'POST', 
            body: bodyData,
            mode: 'no-cors'
        });

        // 5. ПАУЗА И ПОЛУЧЕНИЕ НОМЕРА
        status.textContent = "🔍 Присваиваем номер заявке...";
        
        // Ждем 3.5 секунды, чтобы Google успел "прожевать" POST-запрос
        await new Promise(resolve => setTimeout(resolve, 3500));

        // Первая попытка синхронизации
        await checkActiveOrder(); 
        let finalOrderNumber = localStorage.getItem('cached_order');

        // Если с первого раза не нашли (Google бывает задумчив)
        if (!finalOrderNumber) {
            status.textContent = "⏳ Почти готово...";
            await new Promise(resolve => setTimeout(resolve, 2500));
            await checkActiveOrder();
            finalOrderNumber = localStorage.getItem('cached_order');
        }

        // Результирующий номер для показа
        const orderToDisplay = finalOrderNumber || "принята";

        // 6. ПОКАЗЫВАЕМ МОДАЛКУ (ОДИН РАЗ!)
        showModal(
            "Заявка отправлена!", 
            isFull ? "Мы свяжемся с вами для подтверждения времени." : "Мастер рассчитает стоимость, и она появится в этом окне.", 
            "success", 
            "", 
            orderToDisplay
        );

        // 7. ОЧИСТКА
        if (!isFull) {
            currentForm.reset(); 
            selectedFiles = [];
            if (typeof renderPreviews === 'function') renderPreviews();
            
            // Чистим черновики, так как заявка уже ушла
            localStorage.removeItem('draft_name');
            localStorage.removeItem('draft_phone');
        }

    } catch (err) {
        console.error("Ошибка в submit:", err);
        showModal("Заявка принята!", "Мастер уже получил уведомление.", "success", "", "в обработке");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnHTML;
        if (status) status.textContent = "";
    }
});

            // ================= МАСКА ДЛЯ ТЕЛЕФОНА =================
    const phoneInput = document.getElementById('phone');

    // 1. При фокусе (клике) на поле сразу подставляем "8 (9"
    phoneInput.addEventListener('focus', function() {
        if (!this.value) {
            this.value = '8 (9';
        }
    });

    // 2. Убираем "8 (9", если пользователь кликнул, но передумал и ушел из поля
    phoneInput.addEventListener('blur', function() {
        if (this.value === '8 (9' || this.value === '8 (' || this.value === '8') {
            this.value = '';
        }
    });

    // 3. Умная обработка ввода
    phoneInput.addEventListener('input', function(e) {
        let val = this.value.replace(/\D/g, ''); // Очищаем от всего, кроме цифр

        // Если всё стерли
        if (!val) {
            this.value = '';
            return;
        }

        // Обрабатываем первую цифру
        if (['7', '8', '9'].includes(val[0])) {
            // Если человек начал с 9, добавляем 8
            if (val[0] === '9') val = '8' + val;
            // Если начал с 7 (включая +7) или 8, принудительно ставим 8
            else val = '8' + val.substring(1);
        } else {
            // Если вдруг начал вводить с какой-то левой цифры (например, с 1)
            val = '89' + val;
        }

        // Собираем красивую строку по маске
        let res = '8';
        if (val.length > 1) res += ' (' + val.substring(1, 4);
        if (val.length > 4) res += ') ' + val.substring(4, 7);
        if (val.length > 7) res += '-' + val.substring(7, 9);
        if (val.length > 9) res += '-' + val.substring(9, 11);

        // Ограничиваем длину (11 цифр + спецсимволы = 17-18 символов)
        this.value = res.substring(0, 18);
    });
    // =======================================================



// Запускаем проверку при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Просто запускаем проверку при загрузке. 
    // Если заказ есть — checkActiveOrder вызовет renderPlaceholder.
    if (typeof checkActiveOrder === 'function') {
        checkActiveOrder();
    }
    
    // Очистим старые флаги на всякий случай, они нам больше не нужны
    sessionStorage.removeItem('force_show_form');
    sessionStorage.removeItem('target_mode');
});

        dateInput.min = getLocalDateStr(); dateInput.value = getLocalDateStr();
        dateInput.addEventListener('change', updateAvailableHours); updateAvailableHours();
        document.addEventListener('click', (e) => { if (e.target !== addressInput) suggestionsBox.style.display = 'none'; });


        function showPrivacy() {
    const briefText = `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;">
            <p><b>Если коротко:</b></p>
            <ul style="margin-left: 20px; margin-bottom: 15px;">
                <li>Мы используем ваш номер только для связи по заказу.</li>
                <li>Ваш адрес нужен только для приезда мастера.</li>
                <li>Мы не передаем данные рекламным агентствам и спамерам.</li>
                <li>Данные хранятся в защищенной таблице Google.</li>
            </ul>
            <p style="font-size: 12px; color: #666;">
                Полный текст документа в соответствии с ФЗ-152 доступен по ссылке ниже.
            </p>
            <a href="ССЫЛКА_НА_ПОЛНЫЙ_ДОКУМЕНТ" target="_blank" style="display: block; margin-top: 10px; color: var(--primary); font-weight: 600;">
                Читать полную версию (PDF/Docs)
            </a>
        </div>
    `;
    
    // Вызываем твою стандартную модалку
    showModal("Конфиденциальность", briefText, "info");
}


function switchForm(mode) {
    const currentMode = mode.toUpperCase();
    const overlay = document.getElementById('status-overlay');
    const formFields = document.getElementById('form-fields-wrapper');
    
    const activeOrder = localStorage.getItem('active_order_id');
    const activeStatus = localStorage.getItem('active_order_status'); // Читаем статус

    // 1. ЛОГИКА "УМНОГО" ПЕРЕКРЫТИЯ
    let shouldShowOverlay = false;

    if (currentMode === 'LIGHT' && activeOrder) {
        // В краткой форме показываем заглушку всегда, если есть заказ
        shouldShowOverlay = true;
    } 
    else if (currentMode === 'FULL' && activeOrder && activeStatus === 'Подтверждён') {
        // В полной форме показываем заглушку ТОЛЬКО если статус "Подтверждён"
        shouldShowOverlay = true;
    }

    // 2. ПРИМЕНЯЕМ ВИДИМОСТЬ
    if (shouldShowOverlay) {
        if (overlay) overlay.style.display = 'block';
        if (formFields) formFields.style.display = 'none';
        checkActiveOrder(); // Обновляем данные с сервера
        updateTabVisuals(currentMode);
        return; // Выходим, поля не нужны
    } else {
        // Показываем поля формы
        if (overlay) overlay.style.display = 'none';
        if (formFields) formFields.style.display = 'block';
    }

    // 3. ОСТАЛЬНОЙ КОД (updateTabVisuals, fieldsToToggle и т.д.)
    updateTabVisuals(currentMode);

    // 4. УПРАВЛЕНИЕ ПОЛЯМИ (Показываем/скрываем части формы внутри formFields)
    // Этот блок работает только если formFields.style.display = 'block'
    const isFull = (currentMode === 'FULL');
    const fieldsToToggle = [
        document.getElementById('extra-fields-address'),
        document.getElementById('extra-fields-date'),
        document.getElementById('extra-fields-comment'),
        document.getElementById('extra-fields-type-of-furniture'),
    ];

    fieldsToToggle.forEach(el => {
        if (!el) return;
        if (isFull) {
            el.style.display = 'grid';
            el.querySelectorAll('input, select, textarea').forEach(i => {
                i.disabled = false;
                if (['address', 'order-date'].includes(i.id)) i.required = true;
            });
        } else {
            el.style.display = 'none';
            el.querySelectorAll('input, select, textarea').forEach(i => {
                i.disabled = true;
                i.required = false;
            });
        }
    });

    // Автозаполнение
    if (isFull) {
        const n = document.getElementById('name');
        const p = document.getElementById('phone');
        if (n) n.value = localStorage.getItem('draft_name') || n.value;
        if (p) p.value = localStorage.getItem('draft_phone') || p.value;
    }
}

function updateTabVisuals(mode) {
    const isFull = (mode === 'FULL');
    const tabLight = document.getElementById('tab-light');
    const tabFull = document.getElementById('tab-full');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');

    if (tabLight) tabLight.classList.toggle('active', !isFull);
    if (tabFull) tabFull.classList.toggle('active', isFull);
    
    if (formTitle) formTitle.innerText = isFull ? 'Оформить заявку' : 'Оставить заявку';
    if (submitBtn) submitBtn.textContent = isFull ? 'Записаться на чистку' : 'Рассчитать стоимость';
}

function goToForm(mode) {
    // 1. Сначала переключаем форму в нужный режим (используем твою функцию)
    switchForm(mode);
    
    // 2. Находим элемент формы
    const formSection = document.getElementById('form');
    
    // 3. Плавно скроллим к нему
    formSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });

    // 4. Опционально: добавляем легкую подсветку заголовку, чтобы привлечь внимание
    const title = document.getElementById('form-title');
    title.style.transition = 'color 0.3s ease';
    title.style.color = 'var(--primary)';
    setTimeout(() => {
        title.style.color = '';
    }, 1000);
}


// ================= ПРОВЕРКА АКТИВНОГО ЗАКАЗА (ГИБРИДНАЯ) =================
async function checkActiveOrder() {
    // Используем правильный ID, который задан в начале файла
    const sessionId = localStorage.getItem('service_session_id'); 
    const cachedOrder = localStorage.getItem('cached_order');
    const cachedStatus = localStorage.getItem('cached_status') || 'Новый';

    // ОПТИМИЗАЦИЯ: Если человек еще ничего не отправлял, не мучаем сервер
    if (!sessionId && !cachedOrder) {
        console.log("Новый посетитель, проверка статуса пропущена.");
        return;
    }

    // 1. МГНОВЕННЫЙ ПОКАЗ (из памяти)
    if (cachedOrder) {
        renderPlaceholder(cachedOrder, cachedStatus);
    }

    try {
        // 2. ФОНОВАЯ СИНХРОНИЗАЦИЯ
        // Важно: используем sessionId, который достали выше
        const response = await fetch(`${scriptURL}?action=check_status&session_id=${sessionId}&t=${Date.now()}`);
        const data = await response.json();
        
        console.log("Данные из таблицы:", data);

        if (data && data.hasActiveOrder) {
            // Сохраняем актуальное состояние
            localStorage.setItem('active_order_id', data.orderNumber);
            localStorage.setItem('active_order_status', data.status); 
            localStorage.setItem('cached_order', data.orderNumber);
            localStorage.setItem('cached_status', data.status);
            
            // Перерисовываем с ценой
            renderPlaceholder(data.orderNumber, data.status, data.price);
        } else {
            // Если заказа больше нет (выполнен/отменен в таблице)
            if (cachedOrder) {
                localStorage.removeItem('active_order_id');
                localStorage.removeItem('cached_order');
                localStorage.removeItem('cached_status');
                location.reload(); 
            }
        }
    } catch (e) {
        console.log("Ошибка связи с таблицей:", e);
    }
}

// Мини-функция, чтобы не дублировать HTML-код заглушки
function renderPlaceholder(orderNum, statusText, price = "") {
    const overlay = document.getElementById('status-overlay');
    const formFields = document.getElementById('form-fields-wrapper');
    
    if (!overlay || !formFields) return;

    // Защита: если номер заказа пришел как "принята" или пустой, берем из кэша
    const finalNum = (orderNum && orderNum !== "принята") ? orderNum : (localStorage.getItem('cached_order') || "...");

    let priceHtml = "";
    if (price && price.toString().trim() !== "") {
        priceHtml = `
            <div style="background: rgba(4, 224, 97, 0.1); border: 2px dashed #04e061; padding: 15px; border-radius: 12px; margin: 15px 0;">
                <p style="margin:0; font-size: 14px; color: #666;">Стоимость работы по Вашей заявке:</p>
                <p style="margin:0; font-size: 26px; font-weight: 800; color: #04e061;">${price} ₽</p>
            </div>
        `;
    }

    overlay.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 40px; margin-bottom: 10px;">⏱️</div>
            <h2 style="font-size: 22px; margin-bottom: 5px;">Заявка №${finalNum}</h2>
            <p style="color: #666; font-size: 14px;">Статус: <b style="color: #04e061;">${statusText}</b></p>
            
            ${priceHtml} 

            <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px; align-items: center;">
                ${price ? `
                <button onclick="switchForm('FULL')" 
                        style="width: 100%; max-width: 250px; background: #04e061; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    Оформить заказ полностью
                </button>
                ` : ''}

                <button onclick="cancelOrder('${finalNum}')" 
                        style="width: 100%; max-width: 250px; background: #f4f4f4; color: #666; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    Отменить заявку
                </button>
            </div>
            
            <p style="font-size: 12px; color: #999; margin-top: 15px;">
                ${price ? 'Мастер оценил работу. Выберите время визита.' : 'Ожидайте, мастер рассчитывает стоимость...'}
            </p>
        </div>
    `;

    overlay.style.display = 'block';
    formFields.style.display = 'none';
}


async function cancelOrder(orderNum) {
    if (!confirm('Вы уверены, что хотите отменить заявку?')) return;

    try {
        // 1. Сначала уведомляем сервер (Гугл Таблицу)
        // Добавляем t=Date.now() чтобы браузер не выдал старый ответ из кэша
        const response = await fetch(`${scriptURL}?action=cancel_order&order_id=${orderNum}&t=${Date.now()}`);
        
        // 2. ПОЛНАЯ ОЧИСТКА всех следов заказа в браузере
        const keysToRemove = [
            'active_order_id', 
            'active_order_status', 
            'cached_order', 
            'cached_status',
            'session_id',         // Удаляем ID сессии, чтобы пользователь стал "новым"
            'service_session_id'  // И этот тоже, если используешь такое имя
        ];
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        alert('Заявка успешно отменена.');
        
        // 3. Жесткая перезагрузка, чтобы сбросить все состояния скрипта
        window.location.reload(); 

    } catch (e) {
        console.error("Ошибка при отмене:", e);
        // Даже если сервер упал, лучше почистить локально, чтобы юзер не застрял
        localStorage.removeItem('cached_order');
        localStorage.removeItem('cached_status');
        location.reload();
    }
}