import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";

import { getTickets, saveTickets, createTicket } from "../utils/storage";
import generateId from "../utils/idGenerator";
import BackToDashboard from "../components/layouts/BackToDashboard";
import PreviewTicket from "../components/modals/PreviewTicket";


export default function AddTicket() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);


  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title cannot exceed 50 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(20, "Description must be at least 20 characters")
      .max(300, "Description cannot exceed 300 characters")
      .required("Description is required"),
    priority: Yup.string().required("Priority is required"),
  });


  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };



  return (
    <div className="min-h-screen pb-10 bg-gray-50 dark:bg-gray-900">

      <BackToDashboard />

      <div className="mt-3 p-4 sm:p-6 md:p-8 lg:p-10 max-w-xl mx-auto border-0 md:border-1 rounded-xl bg-transparent md:bg-white dark:md:bg-gray-800 border-gray-200 dark:border-gray-700 md:shadow-md "> {/*shadow-md*/}


        {/*---------------------------------text header--------------------------------------START--------------------------------------------*/}

        <h1 className="text-h4-custom">
          Create New Ticket
        </h1>

        <p className="mb-4 text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
          Fill in all the information below, then click the submit button.
        </p>

        {/*---------------------------------text header--------------------------------------END--------------------------------------------*/}


        {/*---------------------------------inputs--------------------------------------START--------------------------------------------*/}
        <Formik
          initialValues={{
            id: generateId(),
            title: "",
            description: "",
            priority: "low",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setPreview(values);
            setSubmitting(false);
          }}
        >

          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">

              <div>
                <label className="form-titles">
                  Ticket ID
                </label>
                <Field
                  name="id"
                  readOnly
                  className="cursor-not-allowed w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-500 focus:outline-none"
                />
              </div>


              <div>
                <label className="form-titles">
                  Title
                </label>
                <Field
                  name="title"
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 border-gray-500 dark:border-gray-500 focus:outline-none focus:border-gray-800 dark:focus:border-white "
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-err"
                />
              </div>


              <div>
                <label className="form-titles">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="6"
                  className="w-full p-2 border rounded bg-gray-100 border-gray-500 dark:bg-gray-700 resize-none overflow-y-auto h-32 focus:outline-none dark:border-gray-500 focus:border-gray-800 dark:focus:border-white"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-err"
                />
              </div>


              <div>
                <label className="form-titles">
                  Priority
                </label>
                <Field
                  as="select"
                  name="priority"
                  onChange={(e) => setFieldValue("priority", e.target.value)}
                  className={`cursor-pointer p-2 border rounded w-full focus:outline-none dark:border-gray-500 ${priorityColors[values.priority]
                    }`}
                >
                  <option value="low" className="bg-white dark:bg-gray-600 text-gray-700 dark:text-white">
                    Low
                  </option>
                  <option value="medium" className="bg-white dark:bg-gray-600 text-gray-700 dark:text-white">
                    Medium
                  </option>
                  <option value="high" className="bg-white dark:bg-gray-600 text-gray-700 dark:text-white">
                    High
                  </option>
                </Field>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer text-button-custom  px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit Ticket
                </button>
              </div>

            </Form>
          )}
        </Formik>

        {/*---------------------------------inputs--------------------------------------END--------------------------------------------*/}
        

        {/*=====================================Preview Window========================START=======================================================*/}

        {preview && (
          <PreviewTicket
            preview={preview}
            priorityColors={priorityColors}
            onClose={() => setPreview(null)}
            onSubmit={() => {
              const newTicket = createTicket(preview);
              const tickets = getTickets();
              tickets.unshift(newTicket);
              saveTickets(tickets);
              setPreview(null);
              navigate("/");
            }}
          />
        )}
        
        {/*=====================================Preview Window========================END=======================================================*/}


      </div>
    </div>
  );
}
