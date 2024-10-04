import AOS from "aos";
import "aos/dist/aos.css";
import "../css/skilline.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
        const [open, setOpen] = useState(false);
        useEffect(() => {
                AOS.init({
                        duration: 1000,
                        once: true,
                });
        }, []);
        return (
                <>
                        <div className="w-full text-gray-700 bg-[#E576BC]">
                                <div className="flex flex-col max-w-screen-xl px-8 mx-auto md:items-center md:justify-between md:flex-row">
                                        <div className="flex flex-row items-center justify-between py-6">
                                                <div className="relative md:py-2 md:mt-5">
                                                        <a
                                                                href="#"
                                                                className="relative z-50"
                                                        >
                                                                <img
                                                                        src="img/logo_farmasi1.png"
                                                                        alt="Logo Fakultas Farmasi"
                                                                        className="h-14"
                                                                />
                                                        </a>
                                                        {/* <svg
                                                                className="h-11 z-40 absolute -top-2 -left-3"
                                                                viewBox="0 0 79 79"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                                <path
                                                                        d="M35.2574 2.24264C37.6005 -0.100501 41.3995 -0.100505 43.7426 2.24264L76.7574 35.2574C79.1005 37.6005 79.1005 41.3995 76.7574 43.7426L43.7426 76.7574C41.3995 79.1005 37.6005 79.1005 35.2574 76.7574L2.24264 43.7426C-0.100501 41.3995 -0.100505 37.6005 2.24264 35.2574L35.2574 2.24264Z"
                                                                        fill="#65DAFF"
                                                                />
                                                        </svg> */}
                                                </div>
                                                <button
                                                        className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                                                        onClick={() => setOpen(!open)}
                                                >
                                                        {open ? (
                                                                <svg
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                        className="w-6 h-6"
                                                                >
                                                                        <path
                                                                                fillRule="evenodd"
                                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                                clipRule="evenodd"
                                                                        />
                                                                </svg>
                                                        ) : (
                                                                <svg
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                        className="w-6 h-6"
                                                                >
                                                                        <path
                                                                                fillRule="evenodd"
                                                                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                                                                clipRule="evenodd"
                                                                        />
                                                                </svg>
                                                        )}
                                                </button>
                                        </div>
                                        <nav
                                                className={`${open ? 'h-full ' : 'h-0 scale-y-0 lg:scale-100 '
                                                        } md:h-auto flex flex-col flex-grow md:items-center pb-4 md:pb-0 md:flex md:justify-end md:flex-row origin-top duration-300 `}
                                        >
                                                <Link to="/login"
                                                        className="px-10 py-3 mt-2 text-sm text-center bg-white text-gray-800 rounded-full md:py-2 md:mt-5 md:ml-4"

                                                >
                                                        Sign In
                                                </Link>
                                        </nav>
                                </div>
                        </div>

                        <div className="bg-[#E576BC]">
                                <div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start">
                                        <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
                                                <h1 data-aos="fade-right" data-aos-once="true" className="my-4 text-5xl font-bold leading-tight text-darken">
                                                        <span className="text-[#ffc20c]">Selamat Datang di Sistem Akademik</span> <span className="text-white">Fakultas Farmasi Universitas Islam Sulatan Agung</span>
                                                </h1>

                                        </div>
                                        <div className="w-full lg:w-6/12 lg:-mt-10 relative" id="girl">
                                                <img data-aos="fade-up" data-aos-once="true" className="w-10/12 mx-auto 2xl:-mb-20" src="img/girl.png" />
                                                <div data-aos="fade-up" data-aos-delay={300} data-aos-once="true" className="absolute top-20 -left-6 sm:top-32 sm:left-10 md:top-40 md:left-16 lg:-left-0 lg:top-52 floating-4">
                                                        <img className="bg-white bg-opacity-80 rounded-lg h-12 sm:h-16" src="img/kalender-akademik2.png" />
                                                </div>
                                                <div data-aos="fade-up" data-aos-delay={400} data-aos-once="true" className="absolute top-20 right-10 sm:right-24 sm:top-28 md:top-36 md:right-32 lg:top-32 lg:right-16 floating">
                                                        <svg className="h-16 sm:h-24" viewBox="0 0 149 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g filter="url(#filter0_d)">
                                                                        <rect x={40} y={32} width={69} height={69} rx={14} fill="#F3627C" />
                                                                </g>
                                                                <rect x="51.35" y="44.075" width="47.3" height="44.85" rx={8} fill="white" />
                                                                <path d="M74.5 54.425V78.575" stroke="#F25471" strokeWidth={4} strokeLinecap="round" />
                                                                <path d="M65.875 58.7375L65.875 78.575" stroke="#F25471" strokeWidth={4} strokeLinecap="round" />
                                                                <path d="M83.125 63.9125V78.575" stroke="#F25471" strokeWidth={4} strokeLinecap="round" />
                                                                <defs>
                                                                        <filter id="filter0_d" x={0} y={0} width={149} height={149} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                                                <feOffset dy={8} />
                                                                                <feGaussianBlur stdDeviation={20} />
                                                                                <feColorMatrix type="matrix" values="0 0 0 0 0.825 0 0 0 0 0.300438 0 0 0 0 0.396718 0 0 0 0.26 0" />
                                                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                                        </filter>
                                                                </defs>
                                                        </svg>
                                                </div>
                                                <div data-aos="fade-up" data-aos-delay={500} data-aos-once="true" className="absolute bottom-14 -left-4 sm:left-2 sm:bottom-20 lg:bottom-24 lg:-left-4 floating">
                                                        <img className="bg-white bg-opacity-80 rounded-lg h-20 sm:h-28" src="img/new.png" />
                                                </div>
                                                <div data-aos="fade-up" data-aos-delay={600} data-aos-once="true" className="absolute bottom-20 md:bottom-48 lg:bottom-52 -right-6 lg:right-8 floating-4">
                                                        <img className="bg-white bg-opacity-80 rounded-lg h-12 sm:h-16" src="img/informasi.png" />
                                                </div>
                                        </div>
                                </div>
                                <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-40 relative">
                                        <svg className="xl:h-40 xl:w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                                <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" fill="currentColor" />
                                        </svg>
                                        <div className="bg-white w-full h-20 -mt-px" />
                                </div>
                        </div>
                        <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 overflow-hidden">
                                <div className="max-w-4xl mx-auto">
                                        <h1 className="text-center mb-3 text-gray-400 font-medium">Kerjasama Internasional Yang Telah Tejalin Dengan Fakultas Farmasi
                                        </h1>
                                        <div className="grid grid-cols-3 lg:grid-cols-7 gap-4 justify-items-center">
                                                <img className="h-13" src="img/usm.png" />
                                                <img className="h-13" src="img/san_pedro_college.png" />
                                                <img className="h-13" src="img/ukm.png" />
                                                <img className="h-13 transform translate-y-2" src="img/mahidol.png" />
                                                <img className="h-13" src="img/srinakharinwirot.png" />
                                                <img className="h-13" src="img/utm.png" />
                                                <img className="h-13" src="img/chulalongkorn_universiti.png" />
                                        </div>
                                </div>
                                <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
                                        <h1 className="font-bold text-[#cf358c] my-3 text-2xl">One Access <span className="text-yellow-500">For Multiple Systems.</span></h1>
                                        <p className="leading-relaxed text-gray-500">Fakultas Farmasi memiliki beberapa sistem yang hanya memerlukan satu kali akses untuk dapat masuk ke beberapa sistem tersebut, diantaranya sebgai berikut:</p>
                                </div>
                                <div className="grid md:grid-cols-4 gap-14 md:gap-5 mt-20">
                                        <div data-aos="fade-up" className="bg-white shadow-xl p-6 text-center rounded-xl">
                                                <div style={{ background: '#5B72EE' }} className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                                                        <img src="img/akademik.png" alt="Sistem Kepegawaian" className="w-10 h-10 text-white" />
                                                </div>
                                                <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">Sistem Akademik</h1>
                                                <p className="px-4 text-gray-500">Platform yang mengelola aktivitas akademik seperti pendaftaran mata kuliah, manajemen kelas, dan pemantauan performa mahasiswa.</p>
                                        </div>
                                        <div data-aos="fade-up" data-aos-delay={150} className="bg-white shadow-xl p-6 text-center rounded-xl">
                                                <div style={{ background: '#F48C06' }} className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                                                        <img src="img/pegawai.png" alt="Sistem Kepegawaian" className="w-10 h-10 text-white" />
                                                </div>
                                                <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">Sistem Kepegawaian</h1>
                                                <p className="px-4 text-gray-500">Sistem yang mengelola data dan administrasi pegawai, termasuk absensi, penggajian, dan evaluasi kinerja.</p>
                                        </div>
                                        <div data-aos="fade-up" data-aos-delay={300} className="bg-white shadow-xl p-6 text-center rounded-xl">
                                                <div style={{ background: '#29B9E7' }} className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                                                        <img src="img/penilaian.png" alt="Sistem Kepegawaian" className="w-10 h-10 text-white" />
                                                </div>
                                                <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken lg:h-14 pt-3">Sistem Penilaian
                                                </h1>
                                                <p className="px-4 text-gray-500">Mencatat dan menilai aktivitas pembelajaran mahasiswa secara berkala melalui jurnal pembelajaran. </p>
                                        </div>
                                        <div data-aos="fade-up" data-aos-delay={300} className="bg-white shadow-xl p-6 text-center rounded-xl">
                                                <div style={{ background: '#E576BC' }} className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                                                        <img src="img/keuangan.png" alt="Sistem Kepegawaian" className="w-10 h-10 text-white" />
                                                </div>
                                                <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken lg:h-14 pt-3">Sistem Keuangan
                                                </h1>
                                                <p className="px-4 text-gray-500">Mengelola transaksi keuangan Mahasiswa seperti pembayaran biaya pendidikan dan pelaporan keuangan. </p>
                                        </div>
                                </div>
                                <div className="grid md:grid-cols-4 gap-14 md:gap-5 mt-20">
                                        <div data-aos="fade-up" className="bg-white shadow-xl p-6 text-center rounded-xl">
                                                <div style={{ background: '#5B72EE' }} className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                                                        <img src="img/skripsi.png" alt="Sistem Kepegawaian" className="w-10 h-10 text-white" />
                                                </div>
                                                <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">Sistem Skripsi</h1>
                                                <p className="px-4 text-gray-500">Mendukung proses skripsi dari pengajuan judul, bimbingan, hingga pengelolaan sidang skripsi.</p>
                                        </div>
                                        <div data-aos="fade-up" data-aos-delay={150} className="bg-white shadow-xl p-6 text-center rounded-xl">
                                                <div style={{ background: '#F48C06' }} className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                                                        <img src="img/survey.png" alt="Sistem Kepegawaian" className="w-10 h-10 text-white" />
                                                </div>
                                                <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">Sistem survey Kepuasan</h1>
                                                <p className="px-4 text-gray-500">Alat untuk mengukur kepuasan mahasiswa, dosen, dan staf terhadap layanan kampus.</p>
                                        </div>
                                        <div data-aos="fade-up" data-aos-delay={300} className="bg-white shadow-xl p-6 text-center rounded-xl">
                                                <div style={{ background: '#29B9E7' }} className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                                                        <img src="img/cbt.png" alt="Sistem Kepegawaian" className="w-10 h-10 text-white" />
                                                </div>
                                                <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken lg:h-14 pt-3">Sistem CBT
                                                </h1>
                                                <p className="px-4 text-gray-500">Platform ujian berbasis komputer yang memfasilitasi pembuatan soal, pelaksanaan ujian, dan penilaian otomatis. </p>
                                        </div>
                                        <div data-aos="fade-up" data-aos-delay={300} className="bg-white shadow-xl p-6 text-center rounded-xl">
                                                <div style={{ background: '#E576BC' }} className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                                                        <img src="img/osce.png" alt="Sistem Kepegawaian" className="w-10 h-10 text-white" />
                                                </div>
                                                <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken lg:h-14 pt-3">Sistem OSCE
                                                </h1>
                                                <p className="px-4 text-gray-500">Mendukung ujian keterampilan klinis berbasis observasi untuk mengevaluasi kompetensi mahasiswa kesehatan. </p>
                                        </div>
                                </div>
                                <div className="mt-28">
                                        <div data-aos="flip-down" className="text-center max-w-screen-md mx-auto">
                                                <h1 className="text-3xl font-bold text-[#cf358c] mb-4">Fakultas<span className="text-yellow-500"> Farmasi?</span></h1>
                                                <p className="text-gray-500">Fakultas Farmasi memiliki beberapa pilihan program studi di Fakultas Farmasi Universitas Islam Sultan Agung. Pada masing-masing program studi, mahasiswa dapat memilih beberapa konsentrasi ataupun spesialisasi yang ditawarkan lebih lanjut. Berikut untuk beberapa commpany profile yang dimiliki beberapa program studi yang ada di Fakultas Farmasi:</p>
                                        </div>
                                        <div data-aos="fade-up" className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-6 lg:space-x-10 mt-7">
                                                <div className="relative md:w-5/12">
                                                        <img className="rounded-2xl" src="img/baner.png" />
                                                        <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                                        <h1 className="uppercase text-white font-bold text-center text-sm lg:text-l mb-3">
                                                                                Program Studi Sarjana Farmasi</h1>
                                                                        <button className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out"
                                                                                style={{ background: '#c4c4c4' }}
                                                                                onClick={() => window.location.href = "https://sarjanafarmasi.unissula.ac.id/"}
                                                                        >
                                                                                Switch Browser
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div className="relative md:w-5/12">
                                                        <img className="rounded-2xl" src="img/baner.png" />
                                                        <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                                        <h1 className="uppercase text-white font-bold text-center text-sm lg:text-l mb-3">
                                                                                Program Studi Pendidikian Profesi Apoteker</h1>
                                                                        <button className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out"
                                                                                style={{ background: '#c4c4c4' }}
                                                                                onClick={() => window.location.href = "https://profesiapoteker.unissula.ac.id/"}
                                                                        >
                                                                                Switch Browser
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div className="relative md:w-5/12">
                                                        <img className="rounded-2xl" src="img/baner.png" />
                                                        <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                                        <h1 className="uppercase text-white font-bold text-center text-sm lg:text-l mb-3">
                                                                                Program Studi Sarjana Kebidanan dan Profesi Bidan</h1>
                                                                        <button className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out"
                                                                                style={{ background: '#c4c4c4' }}
                                                                                onClick={() => window.location.href = "https://kebidanan.farmasi.unissula.ac.id/"}
                                                                        >
                                                                                Switch Browser
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className="sm:flex items-center sm:space-x-8 mt-36">
                                        <div data-aos="fade-right" className="sm:w-1/2 relative">
                                                <div className="bg-yellow-500 rounded-full absolute w-12 h-12 z-0 -left-4 -top-3 animate-pulse">
                                                </div>
                                                <h1 className="font-semibold text-2xl relative z-50 text-[#cf358c] lg:pr-10">Fakultas Farmasi <br />
                                                        <span className="text-yellow-500">Universitas Islam Sultan Agung</span></h1>
                                                <p className="py-5 lg:pr-32">Fakultas Farmasi Universitas Islam Sultan Agung (UNISSULA) menghadirkan program studi unggulan yang terdiri dari Sarjana Farmasi, Pendidikan Profesi Apoteker, Sarjana Kebidanan, dan Profesi Bidan. Keempat program studi ini telah meraih akreditasi Unggul, mencerminkan komitmen kami dalam mencetak tenaga kesehatan yang kompeten, berintegritas, dan siap bersaing di dunia profesional.</p>
                                        </div>
                                        <div data-aos="fade-left" className="sm:w-1/2 relative mt-10 sm:mt-0">
                                                <div style={{ background: '#E576BC' }} className="floating w-24 h-24 absolute rounded-lg z-0 -top-3 -left-3" />
                                                <iframe
                                                        className="rounded-xl z-40 relative"
                                                        width="560"
                                                        height="315"
                                                        src="https://www.youtube.com/embed/MFf3IBbSi-s?autoplay=1&mute=1"
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen>
                                                </iframe>
                                                <div className="bg-yellow-500 w-40 h-40 floating absolute rounded-lg z-10 -bottom-3 -right-3">
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <footer className="mt-32" style={{ backgroundColor: 'rgba(37, 38, 65, 1)' }}>
                                <div className="max-w-lg mx-auto">
                                        <div className="flex py-12 justify-center text-white items-center px-5 sm:px-20 max-w-3xl mx-auto">
                                                <div className="relative flex justify-center items-center">
                                                        <img className="h-14 mx-2" src="img/logo unissula.png" />
                                                </div>
                                                <span className="border-l border-gray-500 text-sm pl-2 py-2 font-semibold">Fakultas Farmasi<br /> Universitas Islam SUltan Agung</span>
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm justify-center">
                                                <a className="pr-3">Careers</a>
                                                <a className="border-l border-gray-400 px-3">Privacy</a>
                                                <a className="border-l border-gray-400 pl-3">Terms &amp; Conditions</a>
                                        </div>
                                        <div className="text-center text-white">
                                                <p className="my-3 text-gray-400 text-sm">© 2024 Fakultas Farmasi </p>
                                        </div>
                                </div>
                        </footer>

                </>
        )
}
