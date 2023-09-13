import PageTitle from "@/Components/Clients/PageTitle/PageTitle";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const NewPost = () => {
    return <>
        <div className="hero-wrap hero-wrap-2"
             style={{backgroundImage: "url(/images/bg_1.jpg)", backgroundPosition: "50% 0%"}}
             data-stellar-background-ratio="0.5">
            <div className="overlay"></div>
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center">
                    <PageTitle address={'JOB POST'} title={'Post A Job'}/>
                </div>
            </div>
        </div>

        <section className="ftco-section bg-light">
            <div className="container">
                <div className="row">

                    <div data-aos="fade-up" className="col-md-12 col-lg-8 mb-5">

                        <form action="#" className="p-5 bg-white">

                            <div className="row form-group">
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label htmlFor="option-price-1">
                                        <input type="checkbox" id="option-price-1"/> <span
                                            className="text-success">$500</span> For 30 days
                                    </label>
                                </div>
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label htmlFor="option-price-2">
                                        <input type="checkbox" id="option-price-2"/> <span
                                            className="text-success">$300</span> / Monthly Recurring
                                    </label>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label className="font-weight-bold" htmlFor="fullname">Job Title</label>
                                    <input type="text" id="fullname" className="form-control"
                                           placeholder="eg. Professional UI/UX Designer"/>
                                </div>
                            </div>

                            <div className="row form-group mb-5">
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label className="font-weight-bold" htmlFor="fullname">Company</label>
                                    <input type="text" id="fullname" className="form-control"
                                           placeholder="eg. Facebook, Inc."/>
                                </div>
                            </div>


                            <div className="row form-group">
                                <div className="col-md-12"><h3>Job Type</h3></div>
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label htmlFor="option-job-type-1">
                                        <input type="radio" id="option-job-type-1" name="job-type"/> Full Time
                                    </label>
                                </div>
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label htmlFor="option-job-type-2">
                                        <input type="radio" id="option-job-type-2" name="job-type"/> Part Time
                                    </label>
                                </div>

                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label htmlFor="option-job-type-3">
                                        <input type="radio" id="option-job-type-3" name="job-type"/> Freelance
                                    </label></div>
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label htmlFor="option-job-type-4">
                                        <input type="radio" id="option-job-type-4" name="job-type"/> Internship
                                    </label>
                                </div>
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <label htmlFor="option-job-type-4">
                                        <input type="radio" id="option-job-type-4" name="job-type"/> Termporary
                                    </label>
                                </div>

                            </div>

                            <div className="row form-group mb-4">
                                <div className="col-md-12"><h3>Location</h3></div>
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <input type="text" className="form-control" placeholder="Western City, UK"/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12"><h3>Job Description</h3></div>
                                <div className="col-md-12 mb-3 mb-md-0">
                                    <textarea name="" className="form-control" id="" cols={30} rows={5}></textarea>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <input type="submit" value="Post" className="btn btn-primary  py-2 px-5"/>
                                </div>
                            </div>


                        </form>
                    </div>

                    <div className="col-lg-4">
                        <div className="p-4 mb-3 bg-white" data-aos="fade-up">
                            <h3 className="h5 text-black mb-3">Contact Info</h3>
                            <p className="mb-0 font-weight-bold">Address</p>
                            <p className="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>

                            <p className="mb-0 font-weight-bold">Phone</p>
                            <p className="mb-4"><a href="#">+1 232 3235 324</a></p>

                            <p className="mb-0 font-weight-bold">Email Address</p>
                            <p className="mb-0"><a href="#"><span className="__cf_email__"
                                                                  data-cfemail="671e081215020a060e0b2703080a060e094904080a">[email&nbsp;protected]</span></a>
                            </p>

                        </div>

                        <div className="p-4 mb-3 bg-white" data-aos="fade-up">
                            <h3 className="h5 text-black mb-3">More Info</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ad iure porro mollitia
                                architecto hic consequuntur. Distinctio nisi perferendis dolore, ipsa consectetur</p>
                            <p><a href="#" className="btn btn-primary  py-2 px-4">Learn More</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
};


export default NewPost;


export async function getServerSideProps(context:any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),

        }
    }
}
