"use client";
// import { useState } from "react";
// import { Switch } from "@headlessui/react";
import { getStrapiURL } from "../utils/api-helpers";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is equired"),
  message: Yup.string().required("Message is required"),
  // privacyPolicy: Yup.boolean().oneOf([true], 'Privacy Policy must be accepted'),
});

const Contact = () => {
  // const [agreed, setAgreed] = useState(false);

  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      // privacyPolicy: false,
    },
    validationSchema: ContactFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch(getStrapiURL() + "/api/contact-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      });
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Your message has been sent!",
        });
        resetForm();
      } else {
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong!",
          icon: "error",
        });
      }
    },
  });

  return (
    <div className="relative isolate bg-sky-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-slate-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-gray-800/20"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                />
              </svg>
              <div
                className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                  style={{
                    clipPath:
                      "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)",
                  }}
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-100">
            Ready To Take The Next Step?
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
            Seamless Staffing Solutions: Connecting Companies with Outstanding Professionals!
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-zinc-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon
                    className="h-7 w-6 text-slate-200"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  Sagarmatha Complex,Naxal
                  <br />
                  Kathmandu 44600 ,Nepal
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    className="h-7 w-6 text-slate-200"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a className="hover:text-white" href="tel:+1 (555) 234-5678">
                    +977  982-0202111
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon
                    className="h-7 w-6 text-slate-200"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-white"
                    href="mailto:hello@example.com"
                  >
                    info@speedwingshr.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          method="POST"
          className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-slate-100">
                Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoComplete="given-name"
                  placeholder={
                    formik.errors.name ? formik.errors.name : "Enter your name"
                  }
                  className={classNames(
                    formik.errors.name ? "ring-red-600" : "",
                    formik.errors.name
                      ? "placeholder:text-red-600"
                      : "placeholder:text-slate-200",
                    "block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  )}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-slate-100"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  autoComplete="email"
                  placeholder={
                    formik.errors.email
                      ? formik.errors.email
                      : "Enter your email"
                  }
                  className={classNames(
                    formik.errors.email ? "ring-red-600" : "",
                    formik.errors.email
                      ? "placeholder:text-red-600"
                      : "placeholder:text-slate-200",
                    "block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  )}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-slate-100"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  rows={4}
                  placeholder={
                    formik.errors.message
                      ? formik.errors.message
                      : "Enter your message"
                  }
                  className={classNames(
                    formik.errors.message ? "ring-red-600" : "",
                    formik.errors.message
                      ? "placeholder:text-red-600"
                      : "placeholder:text-slate-200",
                    "block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  )}
                />
              </div>
            </div>
            {/* <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={formik.values.privacyPolicy}
                onChange={value=>formik.setFieldValue("privacyPolicy", value)}
                className={classNames(
                  formik.values.privacyPolicy ? "bg-sky-400" : "bg-gray-200",
                  formik.errors.privacyPolicy ? "ring-red-600" : "",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      formik.values.privacyPolicy  ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <a href="#" className="font-semibold text-sky-400">
                  privacy&nbsp;policy
                </a>
                .
              </Switch.Label>
            </Switch.Group> */}
          </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
        
              Let's talk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
