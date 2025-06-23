
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

interface AddImmunizationDialogProps {
  onAddImmunization: (immunization: any) => void;
}

interface ImmunizationFormData {
  patientName: string;
  vaccine: string;
  doseNumber: string;
  administeredBy: string;
}

export function AddImmunizationDialog({ onAddImmunization }: AddImmunizationDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<ImmunizationFormData>({
    defaultValues: {
      patientName: "",
      vaccine: "",
      doseNumber: "",
      administeredBy: "",
    },
  });

  const onSubmit = (data: ImmunizationFormData) => {
    const newImmunization = {
      id: Date.now(),
      ...data,
      date: new Date().toISOString().split('T')[0],
      nextDue: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    onAddImmunization(newImmunization);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Immunization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Immunization</DialogTitle>
          <DialogDescription>
            Record a new vaccination for a patient.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientName"
              rules={{ required: "Patient name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter patient name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vaccine"
              rules={{ required: "Vaccine is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vaccine</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vaccine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="COVID-19 Pfizer">COVID-19 Pfizer</SelectItem>
                      <SelectItem value="COVID-19 Moderna">COVID-19 Moderna</SelectItem>
                      <SelectItem value="Influenza">Influenza</SelectItem>
                      <SelectItem value="Tetanus">Tetanus</SelectItem>
                      <SelectItem value="Hepatitis B">Hepatitis B</SelectItem>
                      <SelectItem value="MMR">MMR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doseNumber"
              rules={{ required: "Dose number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dose Number</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1st">1st Dose</SelectItem>
                      <SelectItem value="2nd">2nd Dose</SelectItem>
                      <SelectItem value="3rd">3rd Dose</SelectItem>
                      <SelectItem value="Booster">Booster</SelectItem>
                      <SelectItem value="Annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="administeredBy"
              rules={{ required: "Administrator name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Administered By</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter administrator name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Immunization
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
