import {
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import patternimg from "../img/pattern.png" 


export function SignUp() {
  return (
    <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src={patternimg}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Register As A Therapist</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Full Name
            </Typography>
            <Input
              size="lg"
              placeholder="John Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
              
                 <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Specialization
            </Typography>
            <Input
              size="lg"
              placeholder="Anxiety, Depression, Trauma"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

     <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Year of Experience
            </Typography>
            <Input
              size="lg"
              type="number"
              placeholder="e.g. 2"
              min='0'
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

      <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              About
            </Typography>
            <Textarea
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Consultation fee
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Profile Picture
            </Typography>
            <Input
              size="lg"
              type="file"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button className="mt-6" fullWidth>
            Register Now
          </Button>

        </form>

      </div>
    </section>
  );
}

export default SignUp;
