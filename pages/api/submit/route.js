export async function POST(req, res) {
    //Get the Form Data
    const Formdata = await req.formData();
    const name = Formdata.get('name');
    const age = Formdata.get('age');
    const city = Formdata.get('city');
    //Response 
    return res.status(200).json({ name, age, city })
}