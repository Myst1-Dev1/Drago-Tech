import { useUser } from '../../lib/customHooks';

export default function Profile() {
    const { user } = useUser();
    console.log(user);

    return (
        <div>
            sou o profile

            <div className='container py-5'>
                { user && 
                <div>
                    <p>{user?.name}</p>
                    <p>{user?.city}</p>
                </div> }
            </div>
        </div>
    )
}