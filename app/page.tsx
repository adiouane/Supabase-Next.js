import Dashboard from "./admin/(internal)/dashboard/page";

export default function Home() {
  // const [user, setUser] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   const fetchuser = async () => {
  //     const { data, error } = await supabaseForClientComponent.from('users').select();
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(data);
  //     }
  //   }
  //   fetchuser();
  // }, []);

  return (
    <main className="p-20">
      <Dashboard />
    </main>
  );
}
