import PageTitle from "@/Components/Clients/PageTitle/PageTitle";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const JobPost = () => {
    return <>
        <div className="hero-wrap hero-wrap-2"
             style={{backgroundImage: "url(/images/bg_1.jpg)", backgroundPosition: "50% 0%"}}
             data-stellar-background-ratio="0.5">
            <div className="overlay"></div>
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center">
                    <PageTitle address={'JOB POST'} title={'Browse Job'}/>
                </div>
            </div>
        </div>

        <section className="ftco-section ftco-no-pb bg-light">
            <div className="container">
                <div data-aos="fade-up" className="row justify-content-center mb-4">
                    <div className="col-md-7 text-center heading-section ">
                        <span className="subheading">Browse Jobs</span>
                        <h2 >Advance Search</h2>
                    </div>
                </div>
                <div className="row">
                    <div data-aos="fade-up" className="ftco-search">
                        <div className="row">
                            <div className="col-md-12 nav-link-wrap">
                                <div className="nav nav-pills text-center" id="v-pills-tab" role="tablist"
                                     aria-orientation="vertical">
                                    <a className="nav-link active mr-md-1" id="v-pills-1-tab" data-toggle="pill"
                                       href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Find
                                        a Job</a>

                                    <a className="nav-link" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2"
                                       role="tab" aria-controls="v-pills-2" aria-selected="false">Find a Candidate</a>

                                </div>
                            </div>
                            <div className="col-md-12 tab-wrap">

                                <div className="tab-content p-4" id="v-pills-tabContent">

                                    <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel"
                                         aria-labelledby="v-pills-nextgen-tab">
                                        <form action="#" className="search-job">
                                            <div className="row no-gutters">
                                                <div className="col-md mr-md-2">
                                                    <div className="form-group">
                                                        <div className="form-field">
                                                            <div className="icon"><span
                                                                className="icon-briefcase"></span></div>
                                                            <input type="text" className="form-control"
                                                                   placeholder="eg. Garphic. Web Developer"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md mr-md-2">
                                                    <div className="form-group">
                                                        <div className="form-field">
                                                            <div className="select-wrap">
                                                                <div className="icon"><span
                                                                    className="ion-ios-arrow-down"></span></div>
                                                                <select name="" id="" className="form-control">
                                                                    <option >Category</option>
                                                                    <option >Full Time</option>
                                                                    <option >Part Time</option>
                                                                    <option >Freelance</option>
                                                                    <option >Internship</option>
                                                                    <option >Temporary</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md mr-md-2">
                                                    <div className="form-group">
                                                        <div className="form-field">
                                                            <div className="icon"><span
                                                                className="icon-map-marker"></span></div>
                                                            <input type="text" className="form-control"
                                                                   placeholder="Location"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <div className="form-field">
                                                            <button type="submit"
                                                                    className="form-control btn btn-primary">Search
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade" id="v-pills-2" role="tabpanel"
                                         aria-labelledby="v-pills-performance-tab">
                                        <form action="#" className="search-job">
                                            <div className="row">
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <div className="form-field">
                                                            <div className="icon"><span className="icon-user"></span>
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   placeholder="eg. Adam Scott"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <div className="form-field">
                                                            <div className="select-wrap">
                                                                <div className="icon"><span
                                                                    className="ion-ios-arrow-down"></span></div>
                                                                <select name="" id="" className="form-control">
                                                                    <option >Category</option>
                                                                    <option >Full Time</option>
                                                                    <option >Part Time</option>
                                                                    <option >Freelance</option>
                                                                    <option >Internship</option>
                                                                    <option >Temporary</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <div className="form-field">
                                                            <div className="icon"><span
                                                                className="icon-map-marker"></span></div>
                                                            <input type="text" className="form-control"
                                                                   placeholder="Location"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <div className="form-field border">
                                                            <button type="submit"
                                                                    className="form-control btn btn-primary">Search
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="ftco-section bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 pr-lg-4">
                        <div className="row">
                            <div  className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Partime</span>
                                            <h2 className="mr-3 text-black"><a href="#">Frontend Development</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">Facebook,
                                                Inc.</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Fulltime</span>
                                            <h2 className="mr-3 text-black"><a href="#">Full Stack Developer</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">Google,
                                                Inc.</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Freelance</span>
                                            <h2 className="mr-3 text-black"><a href="#">Open Source Interactive
                                                Developer</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">New
                                                York Times</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Partime</span>
                                            <h2 className="mr-3 text-black"><a href="#">Frontend Development</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">Facebook,
                                                Inc.</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Temporary</span>
                                            <h2 className="mr-3 text-black"><a href="#">Open Source Interactive
                                                Developer</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">New
                                                York Times</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Fulltime</span>
                                            <h2 className="mr-3 text-black"><a href="#">Full Stack Developer</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">Google,
                                                Inc.</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Freelance</span>
                                            <h2 className="mr-3 text-black"><a href="#">Open Source Interactive
                                                Developer</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">New
                                                York Times</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Internship</span>
                                            <h2 className="mr-3 text-black"><a href="#">Frontend Development</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">Facebook,
                                                Inc.</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 " data-aos="fade-up">
                                <div className="job-post-item p-4 d-block d-lg-flex align-items-center">
                                    <div className="one-third mb-4 mb-md-0">
                                        <div className="job-post-item-header align-items-center">
                                            <span className="subadge">Temporary</span>
                                            <h2 className="mr-3 text-black"><a href="#">Open Source Interactive
                                                Developer</a></h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            <div className="mr-3"><span className="icon-layers"></span> <a href="#">New
                                                York Times</a></div>
                                            <div><span className="icon-my_location"></span>
                                                <span>Western City, UK</span></div>
                                        </div>
                                    </div>

                                    <div className="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                        <div>
                                            <a href="#"
                                               className="icon text-center d-flex justify-content-center align-items-center icon mr-2">
                                                <span className="icon-heart"></span>
                                            </a>
                                        </div>
                                        <a href="job-single.html" className="btn btn-primary py-2">Apply Job</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col text-center">
                                <div className="block-27">
                                    <ul>
                                        <li><a href="#">&lt;</a></li>
                                        <li className="active"><span>1</span></li>
                                        <li><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li><a href="#">4</a></li>
                                        <li><a href="#">5</a></li>
                                        <li><a href="#">&gt;</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 sidebar">
                        <div data-aos="fade-up" className="sidebar-box bg-white p-4 ">
                            <h3 className="heading-sidebar">Browse Category</h3>
                            <form action="#" className="search-form mb-3">
                                <div className="form-group">
                                    <span className="icon icon-search"></span>
                                    <input type="text" className="form-control" placeholder="Search..."/>
                                </div>
                            </form>
                            <form action="#" className="browse-form">
                                <label htmlFor="option-job-1"><input type="checkbox" id="option-job-1" name="vehicle"
                                                                      /> Website &amp; Software</label><br/>
                                <label htmlFor="option-job-2"><input type="checkbox" id="option-job-2" name="vehicle"
                                                                     /> Education &amp; Training</label><br/>
                                <label htmlFor="option-job-3"><input type="checkbox" id="option-job-3" name="vehicle"
                                                                     /> Graphics Design</label><br/>
                                <label htmlFor="option-job-4"><input type="checkbox" id="option-job-4" name="vehicle"
                                                                     /> Accounting &amp; Finance</label><br/>
                                <label htmlFor="option-job-5"><input type="checkbox" id="option-job-5" name="vehicle"
                                                                     /> Restaurant &amp; Food</label><br/>
                                <label htmlFor="option-job-6"><input type="checkbox" id="option-job-6" name="vehicle"
                                                                     /> Health &amp; Hospital</label><br/>
                            </form>
                        </div>

                        <div data-aos="fade-up" className="sidebar-box bg-white p-4 ">
                            <h3 className="heading-sidebar">Select Location</h3>
                            <form action="#" className="search-form mb-3">
                                <div className="form-group">
                                    <span className="icon icon-search"></span>
                                    <input type="text" className="form-control" placeholder="Search..."/>
                                </div>
                            </form>
                            <form action="#" className="browse-form">
                                <label htmlFor="option-location-1"><input type="checkbox" id="option-location-1"
                                                                          name="vehicle"  /> Sydney,
                                    Australia</label><br/>
                                <label htmlFor="option-location-2"><input type="checkbox" id="option-location-2"
                                                                          name="vehicle" /> New York, United
                                    States</label><br/>
                                <label htmlFor="option-location-3"><input type="checkbox" id="option-location-3"
                                                                          name="vehicle" /> Tokyo,
                                    Japan</label><br/>
                                <label htmlFor="option-location-4"><input type="checkbox" id="option-location-4"
                                                                          name="vehicle" /> Manila,
                                    Philippines</label><br/>
                                <label htmlFor="option-location-5"><input type="checkbox" id="option-location-5"
                                                                          name="vehicle" /> Seoul, South
                                    Korea</label><br/>
                                <label htmlFor="option-location-6"><input type="checkbox" id="option-location-6"
                                                                          name="vehicle" /> Western City,
                                    UK</label><br/>
                            </form>
                        </div>

                        <div data-aos="fade-up" className="sidebar-box bg-white p-4 ">
                            <h3 className="heading-sidebar">Job Type</h3>
                            <form action="#" className="browse-form">
                                <label htmlFor="option-job-type-1"><input type="checkbox" id="option-job-type-1"
                                                                          name="vehicle"
                                                                          /> Partime</label><br/>
                                <label htmlFor="option-job-type-2"><input type="checkbox" id="option-job-type-2"
                                                                          name="vehicle" /> Fulltime</label><br/>
                                <label htmlFor="option-job-type-3"><input type="checkbox" id="option-job-type-3"
                                                                          name="vehicle" /> Intership</label><br/>
                                <label htmlFor="option-job-type-4"><input type="checkbox" id="option-job-type-4"
                                                                          name="vehicle" /> Temporary</label><br/>
                                <label htmlFor="option-job-type-5"><input type="checkbox" id="option-job-type-5"
                                                                          name="vehicle" /> Freelance</label><br/>
                                <label htmlFor="option-job-type-6"><input type="checkbox" id="option-job-type-6"
                                                                          name="vehicle" /> Fixed</label><br/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
};


export default JobPost;


export async function getServerSideProps(context:any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),

        }
    }
}
