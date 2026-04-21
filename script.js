const GOOGLE_TOKEN = '4f9c8e7a2b6d1f3c9a0e5d7b8c1f2a6e3d9b7c0f1a2e4d6c8b5f3a7e9c2d1b6';

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
            // === 1. ОБЫЧНЫЙ ОБСЕРВЕР ДЛЯ АНИМАЦИЙ (REVEAL) ===
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target); 
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.reveal, .step-card, .price-card, .review-card').forEach(el => {
                el.classList.add('reveal');
                revealObserver.observe(el);
            });

            // === 2. НОВЫЙ ОБСЕРВЕР ДЛЯ ПОДСВЕТКИ МЕНЮ (SCROLLSPY) ===
            const navLinks = document.querySelectorAll('.nav-link');
            const scrollSpyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // Если секция зашла в "активную зону" (центр экрана)
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active-scroll');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active-scroll');
                            }
                        });
                    }
                });
            }, {
                // Зона срабатывания: отступ сверху 20% и снизу 70%. 
                // Это значит, что активной будет считаться секция в верхней части экрана
                rootMargin: '-20% 0px -70% 0px' 
            });

            // Укажи здесь ID всех секций, которые есть в меню
            const sectionsToWatch = ['results', 'prices', 'how-i-do', 'reviews-container-wrapper', 'faq', 'order-form'];
            sectionsToWatch.forEach(id => {
                const el = document.getElementById(id);
                if (el) scrollSpyObserver.observe(el);
            });

            // === 3. ОСТАЛЬНАЯ ЛОГИКА (ФОРМЫ И ДАННЫЕ) ===
            switchForm('LIGHT');

            const savedName = localStorage.getItem('draft_name');
            const savedPhone = localStorage.getItem('draft_phone');
            
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
                    before: "https://optim.tildacdn.com/tild6631-6630-4331-a433-336664303161/-/format/webp/photo_2023-03-16_18-.jpg.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&sat=-100&bri=-20",
                    after:  "https://optim.tildacdn.com/tild3265-3534-4562-b638-646230386561/-/format/webp/photo_2023-03-16_20-.jpg.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                },
                {
                    before: "https://optim.tildacdn.com/tild3566-3163-4235-b962-663663666565/-/format/webp/photo_2023-12-15_10-.jpg.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&sat=-100&bri=-20",
                    after:  "https://optim.tildacdn.com/tild6664-3963-4432-b530-616533633131/-/format/webp/photo_2023-12-15_10-.jpg.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                },
                {
                    before: "https://optim.tildacdn.com/tild6332-3435-4236-b134-303737373037/-/contain/960x488/center/center/-/format/webp/_.jpg.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&sat=-100&bri=-20",
                    after:  "https://optim.tildacdn.com/tild6636-3634-4331-b863-303933333632/-/contain/960x488/center/center/-/format/webp/_.jpg.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                },
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
            // steps:[
            //     { title: "Обеспыливание", desc: "Глубокая сухая чистка мощным профессиональным пылесосом." },
            //     { title: "Удаление пятен", desc: "Локальное выведение водонерастворимых и сложных пятен." },
            //     { title: "Нанесение химии", desc: "Равномерное нанесение и выдержка основного чистящего состава." },
            //     { title: "Ополаскивание", desc: "Экстракторная чистка с вытягиванием грязи из глубины ткани." },
            //     { title: "Нейтрализация", desc: "Обработка кислотным ополаскивателем для удаления остатков химии." },
            //     { title: "Финиш и Сушка", desc: "Финальное ополаскивание и, при необходимости, принудительная сушка." }
            // ],
            // reviews:[
            //     { name: "Мария", text: "Обратилась за химчисткой стульев из достаточно проблематичного материала. Как итог, потрясающий результат работы, исполнение на высшем уровне, однозначно рекомендую к обращению.", date: "11 апреля", avatarURL: "https://static.avito.ru/stub_avatars/%D0%9C/10_48x48.png" },
            //     { name: "Elena", text: "Все прошло отлично мебель стала как новая . Сергей молодец выполнил свою работу аккуратно профессионально. 100 процентов рекомендую.", date: "11 апреля", avatarURL: "https://50.img.avito.st/image/1/1.RMcCD7ay_i7QyFj2JTHzLLak4kjQrOo.vKNOhII2jlYCsyie7GxZ_gBomFmu0_I32RYe9OMvH0I" },
            //     { name: "Ирина Созонова (Серякова)", text: "Была чистка дивана и кресла. Сергей приехал вовремя, очень доброжелательный, спокойный молодой человек! Работу выполнил на \"отлично\"! Спасибо большое! Рекомендую", date: "7 апреля", avatarURL: "https://50.img.avito.st/image/1/1.RMcCD7ay_i7QyFj2JTHzLLak4kjQrOo.vKNOhII2jlYCsyie7GxZ_gBomFmu0_I32RYe9OMvH0I" },
            //     { name: "Екатерина", text: "Отличная работа Сергея! Мои далеко не новые и уже грязные диваны стали как новые, появилось ощущение свежести. Очень довольна результатом чистки и приятным общением. Цена устроила, качество тоже. В дальнейшем снова обращусь к Сергею. Рекомендую искренне! Спасибо! Прилагаю фото.", date: "6 апреля", avatarURL: "https://50.img.avito.st/image/1/1.vMdKtbayBi6YctD1GalJLP4eGkiYFhI.dYBYx-pVYoaq9UYbhGLWuMMLOM5x88JTTnw7Tjvp8Tc" },
            //     { name: "Полина", text: "Отличный специалист! Пунктуальный! Все выполнил быстро и качественно! Спасибо огромное! Диван чистый)", date: "5 апреля", avatarURL: "https://static.avito.ru/stub_avatars/%D0%9F/1_48x48.png" },
            //     { name: "Надежда", text: "Сергей быстро ответил, сразу договорились. Приехал в указанное время, качественно почистил диван. Рекомендую.", date: "31 марта", avatarURL: "https://static.avito.ru/stub_avatars/%D0%9D/1_48x48.png" },
            //     { name: "Марианна", text: "Очень вежливый, аккуратный мастер. Сделал свою работу на 5+. Рекомендую", date: "31 марта", avatarURL: "https://90.img.avito.st/image/1/1.IAPcxLaxmuoOA3Rj77IG6WplhuAOA47o.om50WOaxYba4wPxZ5lwky2nunZMo5TEbtsboMM6w5YY" },
            //     { name: "Алмазовна", text: "Работа сделана качественно, быстро Диванчик как новый 🆕 Рекомендую 😻", date: "25 марта", avatarURL: "https://90.img.avito.st/image/1/1.Bts_SLaxvDLtjx7rDywSMonpoDjtj6gw.cp0i2ee06XH2M3TnYT-n__1ePa6_spc8gqXmoPJcfYM" },
            //     { name: "АА", text: "Работа выполнена хорошо, пунктуальный. Рекомендую", date: "21 марта", avatarURL: "https://static.avito.ru/stub_avatars/%D0%90/2_48x48.png" },
            //     { name: "UMRUD", text: "Быстро договорились. Качественно почистил, диван как новый. Обратимся еще, спасибо!", date: "13 марта", avatarURL: "https://60.img.avito.st/image/1/1.bRTm97ax1_00MCMhyeUs_VBWy_c0MMP_.SGYyeUWOzjqDJ-Xz23iUirzTuaA_94VzFRWtXOEAWhA" },
            //     { name: "Ольга", text: "Работа выполнена качественно, спасибо Сергею. Цена = качество однозначно. ✅ Будем обращаться еще", date: "10 марта", avatarURL: "https://40.img.avito.st/image/1/1.GUYB3raxo6_TGT82JN1mr7d_v6XTGbet.5-d61sh3agjJMXQ4HWNIB-GOCR9ewYLx9xuLDbEAZU4"  },
            //     { name: "Василий", text: "Все отлично, быстро договорились, прибыл точно в срок. Работа выполнена качественно, рекомендую!", date: "10 марта", avatarURL: "https://static.avito.ru/stub_avatars/%D0%92/2_48x48.png"  },
            //     { name: "Анастасия Хар", text: "Замечательный мастер! Сразу ответил на сообщение, сразу подобрали удобное время. Приехал вовремя, всё подробно объяснил, очень вежливый и приятный человек!! Диван как новый🔥 Работа качественная, потом даже подарочек от мастера получили)", date: "9 марта", avatarURL: "https://static.avito.ru/stub_avatars/%D0%90/2_48x48.png"  },
            //     { name: "Данила", text: "В мире можно потерять всё, но нельзя потерять номер этого человека. Повезло тем кто обратился к этому мастеру с самого начала — это можно назвать удачей.", date: "7 марта", avatarURL: "https://10.img.avito.st/image/1/1.r-tI-LaxFQKaP-XBTpONAf5ZCQiaPwEA.6RYurekKsJ-XFA-KezGZR7Iyx7a_K3FcnevUpryZJC0?cqp=2.pGdjs5fBvl5-fB-fm84xxYDAkt8GM2Wgr1fOyxua9Q=="  },
            //     { name: "Елена", text: "Сергей , спасибо Вам большое за безупречную чистоту 🙏Вы настоящий профи . Быстро, качественно и недорого реабилитировали убитые кухонные кресла до состояния новой мебели . Отдельная благодарность за пунктуальность и ответственность, очень оценила, буду рекомендовать всем.", date: "6 марта", avatarURL: "https://80.img.avito.st/image/1/1.5RoHQLaxX_PVh7t1SU-Y87HhQ_nVh0vx.oe0twNXjKA1P_fa9vuZz18PISWE8nfw0hNWgWNkvddI"  },
            //     { name: "Частное лицо", text: "Отличный мастер👍пунктуальный, вежливый ,аккуратный, чистка матраса произведена качественно👌никаких нареканий нет, будем обращаться обязательно еще ! Однозначно ромендую!", date: "3 марта", avatarURL: "https://50.img.avito.st/image/1/1.bZhzlbax13GhUiOdSZ5mcsU0y3uhUsNz.lAUTRkJ8oV2lmJcZXNc6y1BsOCaUHqoLjjJ8Z1o0wpU"  },
            // ]
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
        // const tabsContainer = document.getElementById('tabs-container');
        // const pricesContainer = document.getElementById('prices-container');
        // let isFirstTab = true;
        // for (const[key, label] of Object.entries(DATA.categories)) {
        //     const btn = document.createElement('button');
        //     btn.className = `tab-btn ${isFirstTab ? 'active' : ''}`; btn.textContent = label;
        //     btn.onclick = () => switchTab(key, btn); tabsContainer.appendChild(btn);

        //     const grid = document.createElement('div');
        //     grid.className = `price-grid ${isFirstTab ? 'active' : ''}`; grid.id = `tab-${key}`;
        //     DATA.prices[key].forEach((item, i) => {
        //         grid.innerHTML += `<div class="price-card" style="transition-delay: ${i*0.05}s"><div class="price-info"><h4>${item.name}</h4><p  title="Примерное время выполнения работ"><span class="price-info-icon">⏱</span> ${item.time}</p></div><div class="price-value">${item.price}</div></div>`;
        //     });
        //     pricesContainer.appendChild(grid); isFirstTab = false;
        // }
        // function switchTab(tabId, btnElement) {
        //     document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        //     document.querySelectorAll('.price-grid').forEach(g => g.classList.remove('active'));
        //     btnElement.classList.add('active'); document.getElementById(`tab-${tabId}`).classList.add('active');
        // }

        function switchTab(tabId, btnElement) {
    // 1. Убираем активные классы у всех кнопок и гридов
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.price-grid').forEach(g => g.classList.remove('active'));

    // 2. Активируем нужные элементы
    btnElement.classList.add('active');
    const targetGrid = document.getElementById(`tab-${tabId}`);
    if (targetGrid) {
        targetGrid.classList.add('active');
    }

    // 3. СКРОЛЛ В НАЧАЛО: Возвращаем контейнер цен в самый верх
    const container = document.getElementById('prices-container');
    if (container) {
        container.scrollTo({
            top: 0,
            behavior: 'smooth' // Мягкая прокрутка наверх
        });
    }
}

        // // РЕНДЕР ЭТАПОВ И ОТЗЫВОВ
        // const stepsContainer = document.getElementById('steps-container');
        // DATA.steps.forEach((step, index) => {
        //     stepsContainer.innerHTML += `<div class="step-card reveal delay-${index%3+1}" data-num="0${index + 1}"><h4>${step.title}</h4><p>${step.desc}</p></div>`;
        // });

        // const reviewsContainer = document.getElementById('reviews-container');
        // DATA.reviews.forEach((rev, i) => {
        //     reviewsContainer.innerHTML += `<div class="review-card reveal delay-${i%3+1}"><div><div class="stars">★★★★★</div><p class="review-text">"${rev.text}"</p></div><div class="review-footer">
        //         <div class="avatar"><img src="${rev.avatarURL}"/></div><div class="reviewer-info">
        //             <h5 style="font-size: 16px; font-weight: 700;">${rev.name}</h5><span style="font-size: 13px; color: var(--text-light);">${rev.date}</span></div></div></div>`;
        // });

        /** =================== ЛОГИКА ФОРМЫ ===================== **/
        const _0x5a12 = [
        'exec', 
        '6id1nFQ/', 
        '6wrfRyudgbjFFN6uf6Tr', 
        'y0C7O9N', 
        'LXdWgWHcYyl9CNal', 
        'z8uLhZLzrF2XrKe0iy', 
        'AKfyc b', // Здесь специально вставлен пробел, который мы уберем
        'macros/s/', 
        'script.google.com/'
        ];

        // Собираем ссылку "по кусочкам" с небольшой магией
        // const scriptURL = `https://${_0x5a12[8]}${_0x5a12[7]}${(_0x5a12[6] + _0x5a12[5] + _0x5a12[4] + _0x5a12[3] + _0x5a12[2] + _0x5a12[1]).replace(/\s/g, '')}${_0x5a12[0]}`;
        const scriptURL = `https://script.google.com/macros/s/AKfycbzkY8GkMkQu_6siOBSGyEFDIPkEU9sQL-g_ItZYo8zl7EruucpewxTJ-3bDwKxYDV0QHw/exec`;
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

        async function updateAvailableHours(silent = false) {
    const selectedDate = dateInput.value;
    if (!selectedDate) return;

    // 1. Сразу определяем интервал анимации
    let dots = "";
    const loadingInterval = setInterval(() => {
        dots = dots.length >= 3 ? "" : dots + ".";
        hourSelect.innerHTML = `<option value="">Загрузка${dots}</option>`;
    }, 400);

    try {
        const response = await fetch(`${scriptURL}?action=get_slots&token=${GOOGLE_TOKEN}&t=${Date.now()}`);
        const bookedSlots = await response.json();
        
        // ОСТАНАВЛИВАЕМ таймер сразу после получения данных
        clearInterval(loadingInterval);
        
        const isFullDayBlocked = bookedSlots.some(slot => slot.date === selectedDate && slot.time === "Весь день");
        
        if (isFullDayBlocked) {
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

            const next = findNearby(1);
            const prev = findNearby(-1);

            if (silent === true) {
                // Если режим тихий — переключаем дату и выходим, 
                // НОВАЯ ПРОВЕРКА запустится сама через рекурсию
                if (next) {
                    dateInput.value = next.raw;
                    return updateAvailableHours(true); 
                }
            } else {
                // Если пользователь сам выбрал дату — показываем модалку
                const formattedDate = new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
                let advice = "<div style='margin-top:15px; display:flex; gap:10px; justify-content:center;'>";
                if (prev) advice += `<button type="button" class="date-suggest-btn" onclick="selectSuggestedDate('${prev.raw}')">⬅️ ${prev.nice}</button>`;
                if (next) advice += `<button type="button" class="date-suggest-btn" onclick="selectSuggestedDate('${next.raw}')">${next.nice} ➡️</button>`;
                advice += "</div>";
                
                showModal("День занят", `Извините, на <b>${formattedDate}</b> запись невозможна.<div id="modal-extra" style="margin-top: 20px; color: #000;"><b>Ближайшие даты со свободными слотами:</b><br></div>`, "error", advice);
                dateInput.value = "";
                hourSelect.innerHTML = '<option value="">Выберите дату</option>';
                return;
            }
        }

        // 2. ОСТАНАВЛИВАЕМ таймер, если день не заблокирован и мы идем дальше
        clearInterval(loadingInterval);
        hourSelect.innerHTML = '<option value="">Час</option>';

        const now = new Date(); 
        const todayStr = getLocalDateStr(); 
        const cutoffHour = now.getHours() + 2;
        
        let hasAvailable = false;

        for (let i = 8; i <= 20; i++) {
            let hStr = i.toString().padStart(2, '0');
            // Проверка: время должно быть либо в будущем (если сегодня), либо в любой другой будущий день
            if (selectedDate > todayStr || i >= cutoffHour) {
                const isBooked = bookedSlots.some(slot => {
                    if (slot.date !== selectedDate) return false;
                    const bookedTime = String(slot.time);
                    if (bookedTime === "Весь день") return true;
                    const bookedHour = parseInt(bookedTime.split(':')[0]);
                    // Логика интервала (час до и час после)
                    return (i >= bookedHour - 1 && i <= bookedHour + 1);
                });

                let opt = document.createElement('option');
                opt.value = hStr;
                opt.textContent = isBooked ? `${hStr} (занято)` : `${hStr}`;
                
                if (isBooked) { 
                    opt.disabled = true; 
                    opt.style.color = "#a0aec0"; 
                } else {
                    hasAvailable = true;
                }
                hourSelect.appendChild(opt);
            }
        }

        if (!hasAvailable) {
            hourSelect.innerHTML = '<option value="">Нет свободных слотов</option>';
        }
        
    } catch (e) { 
        clearInterval(loadingInterval);
        hourSelect.innerHTML = '<option value="">Ошибка сети</option>'; 
        console.error("Ошибка загрузки слотов:", e);
    }

    const photoInput = document.getElementById('image');
    if (photoInput && photoInput.files.length > 0) {
        // Если файлы есть, снимаем ошибку "required" принудительно
        photoInput.setCustomValidity(""); 
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
    if (mText) mText.innerHTML = text;
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
    const photoInput = document.getElementById('image'); // ПЕРЕНЕСЛИ СЮДА
    const status = document.getElementById('status');
    const btn = document.getElementById('submit-btn');
    
    // 1. ОПРЕДЕЛЯЕМ РЕЖИМ (по видимости поля адреса)
    const addressField = document.getElementById('address');
    const isActuallyFull = addressField && addressField.offsetParent !== null;
    const hasExistingOrder = localStorage.getItem('cached_order'); // ДОБАВЛЕНО для точной проверки

    // 2. БЕЗОПАСНАЯ ВАЛИДАЦИЯ ЧЕРЕЗ JS
    if (!isActuallyFull) {
        // РЕЖИМ LIGHT (Короткая форма)
        if (!hasExistingOrder && selectedFiles.length === 0) {
            alert("Пожалуйста, прикрепите фото мебели для оценки стоимости!");
            return;
        }
    } else {
        // РЕЖИМ FULL (Полная форма)
        const photoInput = document.getElementById('image');
        const isPhotoGroupHidden = photoInput && photoInput.closest('.input-group').style.display === 'none';

        // Просим фото ТОЛЬКО если это новый заказ, поле видно на экране и файлов еще нет
        if (!hasExistingOrder && !isPhotoGroupHidden && selectedFiles.length === 0) {
            alert("Пожалуйста, прикрепите фото мебели!");
            return;
        }

        // Валидация адреса
        const addrValue = addressField.value.trim();
        if (!/[а-яА-ЯёЁa-zA-Z]/.test(addrValue) || !/\d/.test(addrValue)) {
            alert("Пожалуйста, введите точный адрес (улица и дом)!");
            addressField.focus();
            return;
        }
    }

    // 3. АНТИСПАМ
    const timePassed = (typeof pageLoadTime !== 'undefined') ? (Date.now() - pageLoadTime) : 5000;
    if (document.getElementById('honeypot').value || timePassed < 4000) return;

    // 4. ПОДГОТОВКА КНОПКИ
    const originalBtnHTML = btn.innerHTML;
    btn.disabled = true; 
    btn.innerHTML = `<span class="spinner"></span> Отправка...`;
    if (status) status.textContent = "⏳ Соединение с сервером...";

    try {
        const allInputs = currentForm.querySelectorAll('input, select, textarea');
        allInputs.forEach(el => el.disabled = false);

        const formData = new FormData(currentForm);
        const data = Object.fromEntries(formData.entries());
        data.session_id = currentSessionId;

        // 5. СБОРКА ДАННЫХ
        if (!isActuallyFull) {
            data.form_type = 'LIGHT';
            data.is_update = "false";
            data.address = "Расчёт стоимости";
        } else {
            data.form_type = 'FULL';
            data.is_update = "true";
            data.order_number = localStorage.getItem('cached_order') || "";
            data.price = localStorage.getItem('cached_price') || "";

            const flatVal = document.getElementById('flat')?.value.trim() || "";
            data.address = flatVal ? `${data.address}, кв/оф: ${flatVal}` : data.address;
            
            const hourVal = document.getElementById('hours')?.value || "00";
            const minVal = document.getElementById('minutes')?.value || "00";
            data.time = `${hourVal}:${minVal}`;
        }

        // 6. ФАЙЛЫ
        if (selectedFiles.length > 0) {
            data.filesJSON = JSON.stringify(await getFilesData(selectedFiles));
        }

        if (photoInput.files.length > 0) {
            photoInput.required = false; // Если файлы физически есть, выключаем требование браузера
        }

        // 7. ОТПРАВКА
        const bodyData = new URLSearchParams();
        bodyData.append('token', GOOGLE_TOKEN);

        for (const key in data) {
            bodyData.append(key, data[key] || "");
        }

        try {
            // Отправляем через no-cors, чтобы избежать красных ошибок в консоли
            await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', 
                body: bodyData
            });

            // Даем Google 1.5 секунды на запись и запускаем проверку
            setTimeout(() => {
                checkActiveOrder(true);
            }, 1500);

            form.reset();

        } catch (error) {
            console.error("Ошибка отправки:", error);
            showModal("Ошибка", "Не удалось отправить заявку. Пожалуйста, попробуйте еще раз или свяжитесь со мной по телефону.", "error");
        }

        // 8. СИНХРОНИЗАЦИЯ
        if (status) status.textContent = "🔍 Обновляем статус...";
        await new Promise(resolve => setTimeout(resolve, 4000));
        await checkActiveOrder(true); 

        const finalOrder = localStorage.getItem('cached_order');

        // 9. ПОКАЗ МОДАЛКИ
        showModal(
            "Спасибо!<br>Заявка отправлена!", 
            isActuallyFull ? "Мастер свяжется с вами для подтверждения заказа." : "Мастер рассчитает стоимость, и она появится здесь.", 
            "success", 
            "", 
            finalOrder || "в обработке"
        );

        // 10. ФИНАЛЬНЫЕ ФЛАГИ И ПОЛНАЯ ОЧИСТКА
        if (isActuallyFull) {
            localStorage.setItem('full_submitted', 'true');
        }
        
        // ТЕПЕРЬ ВСЕГДА ОЧИЩАЕМ ФОРМУ ПОСЛЕ УСПЕШНОЙ ОТПРАВКИ (ИСКЛЮЧАЕТ БАГ С ЗАВИСШИМИ ФОТО)
        currentForm.reset();
        selectedFiles = []; // Обнуляем массив
        const photoInp = document.getElementById('image');
        if (photoInp) photoInp.value = ''; // Сбрасываем физический инпут
        if (typeof renderPreviews === 'function') renderPreviews(); // Очищаем экран от миниатюр

        // ВЫЗЫВАЕМ ПЕРЕКЛЮЧЕНИЕ
        switchForm(isActuallyFull ? 'FULL' : 'LIGHT');

    } catch (err) {
        console.error("Ошибка:", err);
        showModal("Готово!", "Заявка отправлена мастеру.", "success", "", "в обработке");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnHTML;
        if (status) status.textContent = "";
    }
});

            // ================= МАСКА ДЛЯ ТЕЛЕФОНА =================
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', function (e) {
        // Получаем только цифры
        let value = this.value.replace(/\D/g, '');
        
        // Если цифр больше 11, обрезаем лишнее
        if (value.length > 11) {
            this.value = value.slice(0, 11);
            // Если у тебя библиотека Inputmask, нужно вызвать метод обновления:
            // this.inputmask._valueSet(value.slice(0, 11)); 
        }
    });

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
    let val = this.value.replace(/\D/g, ''); // 1. Получаем только цифры

    if (!val) {
        this.value = '';
        return;
    }

    // 2. ЛОГИКА ЗАМЕНЫ ПЕРВОЙ ЦИФРЫ
    if (['7', '8', '9'].includes(val[0])) {
        if (val[0] === '9') val = '8' + val;
        else val = '8' + val.substring(1);
    } else {
        val = '89' + val;
    }

    // 3. ЖЕСТКАЯ ОТРЕЗКА (Фикс лишней цифры)
    // Мы берем только первые 11 цифр, что бы браузер ни вставил
    val = val.substring(0, 11);

    // 4. СБОРКА СТРОКИ (res теперь всегда будет правильной длины)
    let res = '8';
    if (val.length > 1) {
        res += ' (' + val.substring(1, 4);
    }
    if (val.length > 4) {
        res += ') ' + val.substring(4, 7);
    }
    if (val.length > 7) {
        res += '-' + val.substring(7, 9);
    }
    if (val.length > 9) {
        res += '-' + val.substring(9, 11);
    }

    this.value = res; // 5. substring(0, 18) больше не нужен, res и так лимитирован
    localStorage.setItem('draft_phone', this.value);
});

phoneInput.addEventListener('paste', function(e) {
    // Даем браузеру вставить текст, а на следующем тике таймера обработчик input всё причешет
    setTimeout(() => {
        this.dispatchEvent(new Event('input'));
    }, 0);
});
    // =======================================================



// Запускаем проверку при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Просто запускаем проверку при загрузке. 
    // Если заказ есть — checkActiveOrder вызовет renderPlaceholder.
    if (typeof checkActiveOrder === 'function') {
        checkActiveOrder();
    }

    const todayStr = getLocalDateStr();
    dateInput.value = todayStr;

    // Запускаем ТИХУЮ проверку. 
    // Она сама переставит дату на завтра, если сегодня — "Весь день" занято.
    updateAvailableHours(true);
    
    // Очистим старые флаги на всякий случай, они нам больше не нужны
    sessionStorage.removeItem('force_show_form');
    sessionStorage.removeItem('target_mode');
});

        dateInput.min = getLocalDateStr(); 
        const todayStr = getLocalDateStr();
        dateInput.value = todayStr;
        dateInput.addEventListener('change', () => {
            updateAvailableHours(false); 
        });
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
    // 1. Сначала определяем все элементы и переменные
    const currentMode = mode ? mode.toUpperCase() : 'LIGHT';
    const overlay = document.getElementById('status-overlay');
    const formFields = document.getElementById('form-fields-wrapper');
    const tabsRow = document.querySelector('.form-tabs'); 
    
    const activeOrder = localStorage.getItem('cached_order');
    const activeStatus = localStorage.getItem('cached_status');
    const fullSubmitted = localStorage.getItem('full_submitted') === 'true';

    // Массив полей (теперь он объявлен в начале и не вызовет ReferenceError)
    const fieldsToToggle = [
        document.getElementById('extra-fields-address'),
        document.getElementById('extra-fields-date'),
        document.getElementById('extra-fields-comment'),
        document.getElementById('extra-fields-type-of-furniture'),
    ];

    // 2. ПРИНУДИТЕЛЬНАЯ БЛОКИРУВКА (Если полная форма отправлена)
    if (fullSubmitted) {
        if (overlay) overlay.style.setProperty('display', 'block', 'important');
        if (formFields) formFields.style.setProperty('display', 'none', 'important');
        
        // Скрываем кнопки переключения режимов навсегда
        if (tabsRow) {
            tabsRow.style.setProperty('display', 'none', 'important');
        }
        
        renderPlaceholder(activeOrder, activeStatus || 'Новый'); 
        return; // Выход. Код ниже не выполнится.
    }

    // 3. ЛОГИКА ОТОБРАЖЕНИЯ ЗАГЛУШКИ (Если есть заказ, но FULL еще не отправлен)
    let shouldShowOverlay = false;
    if (activeOrder && currentMode === 'LIGHT') {
        shouldShowOverlay = true;
    }

    if (shouldShowOverlay) {
        if (overlay) overlay.style.display = 'block';
        if (formFields) formFields.style.display = 'none';
        if (tabsRow) tabsRow.style.display = 'flex';
        
        // Рисуем заглушку ПЕРЕД проверкой статуса, чтобы юзер не видел пустоту
        renderPlaceholder(activeOrder, activeStatus || 'Новый', localStorage.getItem('cached_price') || "");

        checkActiveOrder(); // Обновляем статус в фоне
        updateTabVisuals(currentMode);
        return; 
    } else {
        if (overlay) overlay.style.display = 'none';
        if (formFields) formFields.style.display = 'block';
        if (tabsRow) tabsRow.style.display = 'flex';
    }

    // 4. ПЕРЕКЛЮЧЕНИЕ ВИДИМОСТИ ПОЛЕЙ (LIGHT vs FULL)
    updateTabVisuals(currentMode);
    const isFull = (currentMode === 'FULL');

    fieldsToToggle.forEach(el => {
        if (!el) return;
        if (isFull) {
            el.style.display = 'grid';
            el.querySelectorAll('input, select, textarea').forEach(i => {
                i.disabled = false;
                // Авто-требование заполнения для важных полей в полной форме
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

    const photoInput = document.getElementById('image');
    const photoGroup = photoInput ? photoInput.closest('.input-group') : null;
    
    if (photoGroup) {
        // Если перешли к полной форме с уже начатым заказом - прячем фото
        if (isFull && activeOrder) {
            photoGroup.style.display = 'none'; 
        } else {
            photoGroup.style.display = 'block';
        }
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
    
    if (formTitle) formTitle.innerHTML = isFull ? 'Оформить заявку' : 'Расчитать стоимость';
    if (submitBtn) submitBtn.textContent = isFull ? 'Отправить' : 'Рассчитать стоимость';
}

/* function goToForm(mode) {
    // 1. Сначала переключаем форму в нужный режим (используем твою функцию)
    switchForm(mode);
    
    // 2. Находим элемент формы
    const formSection = document.getElementById('form-section');
    
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
} */

function goToForm(mode, event) {
    // 1. Если передано событие клика — отменяем прыжок браузера
    if (event) {
        event.preventDefault();
    }

    // 2. Сначала переключаем форму
    switchForm(mode);

    // 3. Находим элементы
    const formSection = document.getElementById('form-section');
    const header = document.querySelector('.header'); // ЗАМЕНИТЕ на селектор вашей шапки (например, 'header' или '.top-nav')
    
    // Получаем высоту шапки динамически
    const headerHeight = header ? header.offsetHeight : 0;
    
    // 4. Считаем позицию: (координата формы) + (текущий скролл) - (высота шапки) - (доп. отступ)
    const elementPosition = formSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 20;

    // 5. Скроллим
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // 6. Ваша анимация подсветки
    const title = document.getElementById('form-title');
    title.style.transition = 'color 0.3s ease';
    title.style.color = 'var(--primary)';
    setTimeout(() => { title.style.color = ''; }, 1000);
}


// ================= ПРОВЕРКА АКТИВНОГО ЗАКАЗА (ГИБРИДНАЯ) =================
async function checkActiveOrder(isNewSubmission = false, retries = 3) {
    const sessionId = localStorage.getItem('service_session_id');
    const orderNumber = localStorage.getItem('cached_order');
    const fullSubmitted = localStorage.getItem('full_submitted') === 'true';

    const photoInput = document.getElementById('image');
    const photoGroup = photoInput ? photoInput.closest('.input-group') : null;

    if (!sessionId) return;

    // Включаем "заглушку" (скрываем форму, показываем блок статуса)
    const formContainer = document.getElementById('order-form-container');
    const statusContainer = document.getElementById('order-status-container');
    if (formContainer) formContainer.style.display = 'none';
    if (statusContainer) statusContainer.style.display = 'block';

    try {
        // Добавляем GOOGLE_TOKEN и action=check_status
        const url = `${scriptURL}?action=check_status&token=${GOOGLE_TOKEN}&service_session_id=${sessionId}&order_number=${orderNumber || ''}&t=${Date.now()}`;
        const response = await fetch(url);
        const result = await response.json();

        if (result && result.found) {
            let status = result.status;
            if (status === "Спам" || status === "Бан") status = "Новый";

            const overlay = document.getElementById('status-overlay');
            const isOverlayVisible = overlay && overlay.style.display === 'block';
            const isFullTabActive = document.getElementById('tab-full')?.classList.contains('active');

            // Если заказ завершен или отменен — сбрасываем всё
            if (status === "Выполнен" || status === "Отменён") {
                const keys = ['cached_order','cached_status','cached_price','full_submitted','cached_address','cached_date','cached_time'];
                keys.forEach(k => localStorage.removeItem(k));
                
                if (photoGroup) photoGroup.style.display = 'block';
                if (photoInput) photoInput.required = true;
                switchForm('LIGHT');
                return false;
            }

            // Если это только что отправленная заявка, которой еще не было в памяти — показываем модалку
            if (isNewSubmission && !orderNumber) {
                showModal(
                    "Заявка принята!",
                    `Ваш заказ <b>№${result.orderNumber}</b> успешно создан. Мастер свяжется с вами в течение 15 минут.`,
                    "success"
                );
            }

            // Обновляем данные в памяти
            localStorage.setItem('cached_order', result.orderNumber);
            localStorage.setItem('cached_status', status);
            localStorage.setItem('cached_price', result.price || "");
            localStorage.setItem('cached_address', result.address || "");
            localStorage.setItem('cached_date', result.date || "");
            localStorage.setItem('cached_time', result.time || "");

            // Логика отображения: либо заглушка (placeholder), либо переключение на FULL форму
            if (fullSubmitted || isOverlayVisible) {
                if (typeof renderPlaceholder === 'function') {
                    renderPlaceholder(result.orderNumber, status, result.price || "", result.address, result.date, result.time);
                }
            } else {
                if (photoInput) {
                    photoInput.required = false; 
                    photoInput.removeAttribute('required'); 
                }
                if (photoGroup) photoGroup.style.display = 'none';

                // Если мы еще не на вкладке FULL, принудительно переключаем
                if (!isOverlayVisible && !isFullTabActive) {
                    switchForm('FULL');
                }
            }
            return true;

        } else if (isNewSubmission && retries > 0) {
            // Если заявка новая, но Google еще не обновил таблицу — пробуем снова через 2 сек
            console.log(`Заявка не найдена, пробуем еще раз... Попыток осталось: ${retries}`);
            setTimeout(() => checkActiveOrder(true, retries - 1), 2000);
        } else if (isNewSubmission) {
            // Если все попытки исчерпаны, а номера нет — просто подтверждаем успех
            showModal("Заявка принята!", "Ваша заявка успешно отправлена! Мастер скоро свяжется с вами.", "success");
        }

    } catch (e) { 
        console.error("Ошибка синхронизации:", e); 
    }
    return false;
}

// Мини-функция, чтобы не дублировать HTML-код заглушки
function renderPlaceholder(orderNum, statusText, price = "") {
    const overlay = document.getElementById('status-overlay');
    const formFields = document.getElementById('form-fields-wrapper');
    if (!overlay || !formFields) return;

    const finalPrice = price || localStorage.getItem('cached_price') || "";
    const finalNum = (orderNum && orderNum !== "принята") ? orderNum : (localStorage.getItem('cached_order') || "...");
    
    // Подтягиваем новые данные из кэша
    const addr = localStorage.getItem('cached_address');
    let date = localStorage.getItem('cached_date') || "";
    let time = localStorage.getItem('cached_time') || "";
    const fullSubmitted = localStorage.getItem('full_submitted') === 'true';

    // Если вдруг проскочил формат ISO (с буквой T), обрезаем его
    if (date.includes('T')) date = date.split('T')[0];
    if (time.includes('T')) {
        // Извлекаем только часы и минуты из 1899-12-30T17:00:00.000Z
        const parts = time.split('T')[1]; 
        if (parts) time = parts.substring(0, 5); 
    }

    // Блок деталей визита (показываем, если форма FULL уже отправлена)
    let detailsHtml = "";
    if (fullSubmitted && addr && addr !== "Расчёт стоимости") {
        detailsHtml = `
            <div style="text-align: left; background: #f8f9fa; padding: 15px; border-radius: 12px; margin: 15px 0; border: 1px solid #eee; font-size: 14px; line-height: 1.6;">
                <div style="margin-bottom: 5px;">📍 <b>Адрес:</b> ${addr}</div>
                <div style="margin-bottom: 5px;">📅 <b>Дата:</b> ${date}</div>
                <div>⏱️ <b>Время:</b> ${time}</div>
            </div>
        `;
    }

    let priceHtml = "";
    if (finalPrice) {
        priceHtml = `
            <div style="background: #eef7ff; border: 2px dashed var(--primary); padding: 15px; border-radius: 12px; margin: 15px 0;align-items: center; display: flex; justify-content: center; flex-direction: column;">
                <p style="margin:0; font-size: 13px; color: #666;">Расчётная стоимость:</p>
                <p style="margin:0; font-size: 26px; font-weight: 800; color: var(--primary);">${finalPrice} ₽</p>
            </div>
        `;
    }

    overlay.innerHTML = `
        <div style="text-align: center; padding: 10px 0;">
            <div style="font-size: 100px; margin-bottom: 10px;">${fullSubmitted ? '✅' : '⏱️'}</div>
            <h2 style="font-size: 22px; margin-bottom: 5px;">Заявка №${finalNum}</h2>
            <p style="color: #666; font-size: 14px;">Статус: <b style="color: var(--primary);">${statusText}</b></p>
            
            ${priceHtml}
            ${detailsHtml}

            <div style="margin-top: 20px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
                ${(!fullSubmitted && finalPrice) ? `
                    <button class="btn" onclick="switchForm('FULL')" style="width: 100%; background: #04e061; color: white;">Составить полную заявку</button>
                ` : ''}
                
                <button class="btn btn-outline" onclick="cancelOrder('${finalNum}')" style="width: 100%; border: 1px solid #ddd; color: #888; background: transparent;background: #eee;">
                    ${fullSubmitted ? 'Отменить или перенести' : 'Отменить заявку'}
                </button>
            </div>
            
            <p style="font-size: 15px; color: #999; margin-top: 15px;">
                ${fullSubmitted 
                    ? 'Мастер приедет точно в срок. <br>При изменении планов, пожалуйста, сообщите нам.' 
                    : (finalPrice 
                        ? 'Стоимость рассчитана! <br>Для оформления заказа нажмите кнопку выше.' 
                        : 'Мастер рассчитывает стоимость по вашим фото. <br><b>Информация о цене скоро появится прямо здесь.</b>')
                }
            </p>
        </div>
    `;

    overlay.style.display = 'block';
    formFields.style.display = 'none';
}


async function cancelOrder(orderNum) {
    if (!confirm('Вы уверены, что хотите отменить заявку?')) return;

    try {
        // 1. Уведомляем сервер
        // Используем fetch без await или с обработкой, так как Apps Script может вернуть CORS error 
        // при успешном выполнении. Добавляем t для сброса кэша.
        fetch(`${scriptURL}?action=cancel_order&order_id=${orderNum}&t=${Date.now()}`, { mode: 'no-cors' });
        
        // 2. ПОЛНАЯ ОЧИСТКА (Выметаем всё подчистую)
        const keysToRemove = [
            'active_order_id', 
            'active_order_status', 
            'cached_order', 
            'cached_status',
            'cached_price',
            'full_submitted',     // КРИТИЧНО: именно этот флаг держит заглушку!
            'cached_address',      // На будущее
            'cached_date',         // На будущее
            'cached_time',         // На будущее
            'service_session_id'   // Сбрасываем сессию, чтобы юзер мог создать НОВЫЙ заказ
        ];
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        alert('Заявка успешно отменена.');
        
        // 3. Жесткая перезагрузка вернет форму в исходное состояние
        window.location.reload(); 

    } catch (e) {
        console.error("Ошибка при отмене:", e);
        // Резервный план: если всё упало, чистим базу и перезагружаем
        localStorage.clear(); // Радикально, но эффективно
        window.location.reload();
    }
}


window.addEventListener('load', async () => {
    // 1. Сначала проверяем активный заказ (чтобы понять, какую форму показывать)
    await checkActiveOrder();

    // 2. Логика для телефона (твоя существующая)
    setTimeout(() => {
        const phone = document.getElementById('phone');
        if (phone && phone.value) {
            let digits = phone.value.replace(/\D/g, '');
            if (digits.startsWith('7')) digits = '8' + digits.slice(1);
            if (digits.length > 11) {
                phone.value = digits.substring(0, 11);
                phone.dispatchEvent(new Event('input'));
            }
        }
    }, 500);

    // 3. ИНИЦИАЛИЗАЦИЯ ДАТЫ
    // Проверяем, не установлена ли дата уже (например, если она пришла из кэша)
    if (!dateInput.value) {
        dateInput.value = getLocalDateStr();
    }

    // 4. ТИХИЙ ЗАПУСК СЛОТОВ
    // Вызываем строго с true, чтобы не вылетала модалка при загрузке в выходной
    updateAvailableHours(true);
});



// Вопрос-ответ

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Закрываем все остальные (эффект "аккордеона")
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Если текущий был закрыт — открываем
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
});



// ЛОГИКА ШАПКИ И МЕНЮ
const header = document.querySelector('.header');
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const navLinks = document.querySelectorAll('.nav-link, .btn-small');

// 1. Изменение шапки при скролле
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Открытие/закрытие меню
const toggleMenu = () => {
    burgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
};

burgerBtn.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', toggleMenu);

// 3. Закрытие при клике на ссылку (для мобилок)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) toggleMenu();
    });
});