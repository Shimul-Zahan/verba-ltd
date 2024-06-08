import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_7ay2tdk', 'template_z5dxop8', form.current, '8R2AlonC3RdZ-e1uD')
      .then((result) => {
        console.log('message sent successfully');
        Swal.fire({
          title: "Good job!",
          text: "Message sent!",
          icon: "success"
        });
        e.target.reset();
      }, (error) => {
        console.log(error.text);
      });
  };


  return (
    <div className=''>
      <section class="bg-gradient-to-r from-blue-50 to-blue-400 lg:mb-20">
        <div data-aos="fade-right" class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          {/* <TitleBar class="mt-20" title={'CONTACT WITH US'} /> */}
          <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div class="lg:col-span-2 lg:py-12">
              <p class="max-w-xl text-lg text-[#0C356A]">
                At the same time, the fact that we are wholly owned and totally
                independent from manufacturer and other group control gives you
                confidence that we will only recommend what is right for you.
              </p>

              <div class="mt-8">
                <a href="" class="text-2xl font-bold text-[#0C356A]">
                  0151 475 4450
                </a>

                <address class="mt-2 not-italic text-[#0174BE]">
                  282 Kevin Brook, Imogeneborough, CA 58517
                </address>
              </div>
            </div>

            <div class="rounded-lg bg-[white] p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form ref={form} onSubmit={sendEmail} class="space-y-4">
                <div>
                  <label class="sr-only" for="name">Name</label>
                  <input
                    class="w-full rounded-lg border-[#0C356A] border-2 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    name="user_name"
                  />
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label class="sr-only" for="email">Email</label>
                    <input
                      class="w-full rounded-lg border-[#0C356A] border-2 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      name="user_email"
                    />
                  </div>

                  <div className="w-full flex items-center border-[#0C356A] border-2 rounded-lg">
                    <select
                      className="bg-gray-200 border border-gray-300 p-2 rounded-l"
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+1">+1 (USA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (India)</option>
                    </select>
                    <input
                      required
                      type="number"
                      name="mobilenumber"
                      placeholder="Enter phone number"
                      className="border border-gray-300 p-2 rounded-r w-full"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative w-full">
                    <select
                      // name="language"
                      name="user_country"
                      className="w-full border-[#0C356A] border-2 rounded-lg p-4 pe-12 text-sm shadow-sm text-black"
                    >
                      <option disabled>Select Country</option>
                      <option value="english">Bangladesh</option>
                      <option value="spanish">India</option>
                      <option value="french">USA</option>
                    </select>
                  </div>

                  <div>
                    <label class="sr-only" for="name">Purpose</label>
                    <input
                      class="w-full rounded-lg border-[#0C356A] border-2 p-3 text-sm"
                      placeholder="Purpose"
                      type="text"
                      name="user_purpose"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="sr-only" for="message">Message</label>

                  <textarea
                    class="w-full rounded-lg border-[#0C356A] border-2 p-3 text-sm"
                    placeholder="Your Message"
                    rows="8"
                    id="message"
                    name="message"
                  ></textarea>
                </div>

                <div class="mt-4">
                  <button
                    type="submit"
                    class="inline-block w-full rounded-lg bg-[#0C356A] px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Send Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact