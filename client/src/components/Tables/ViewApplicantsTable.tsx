'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface Job {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    education: string;
    experience: string;
    salary: string;
    choosePosition: string;
    portfolio: string;
    resume: string;
    jobId: string;
    status: string;
}

interface ApplyFromProps {
    jobId: string | undefined; // Define the prop type
}

const ViewApplicantsTable: React.FC<ApplyFromProps> = ({ jobId }) => {
    const router = useRouter();
    const [teams, setTeams] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    // Fetch data from the API
    useEffect(() => {
        const checkSession = async () => {
            const storedUserInfo = localStorage.getItem('sessionToken');
            if (!storedUserInfo) {
                router.push('/admin/login');
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/me`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${storedUserInfo}`,
                        },
                    }
                );

                if (!response.ok) {
                    router.push('/admin/login');
                    return;
                }

                // Fetching the jobs data once session is valid
                const jobResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/admin/jobApply/${jobId}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${storedUserInfo}`,
                        },
                    }
                );

                if (jobResponse.ok) {
                    const data = await jobResponse.json();
                    if (Array.isArray(data.data)) {
                        setTeams(data.data);
                    } else {
                        console.error('Fetched data is not an array:', data);
                    }
                } else {
                    console.error('Failed to fetch job data');
                }
            } catch (error) {
                console.error('Error checking session:', error);
                router.push('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [router, jobId]);





    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Jobs
            </h4>

            <div className="flex flex-col text-white">
                <div className="grid grid-cols-10 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-10">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base text-white">
                            Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base text-white">
                            Email
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Phone
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Address

                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Education
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Experience
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Salary
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            portfolio
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Status
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Resume

                        </h5>
                    </div>
                </div>

                {teams.length > 0 ? (
                    teams.map((job) => (
                        <div
                            className={`grid grid-cols-10 sm:grid-cols-10 ${teams.indexOf(job) === teams.length - 1
                                ? ''
                                : 'border-b border-stroke dark:border-strokedark'
                                }`}
                            key={job.id}
                        >
                            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                <p className="text-black">{job.name}</p>
                            </div>
                            <div className="flex items-center justify-center p-2.5 xl:p-5">
    <p className="text-black break-words w-full">{job.email}</p>
</div>


                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black">{job.phone}</p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 xl:flex xl:p-5">
                                <p className="text-black">{job.address}</p>
                            </div>
                            <div className="hidden items-center justify-center p-2.5 xl:flex xl:p-5">
                                <p className="text-black">{job.education}</p>
                            </div>
                            <div className="hidden items-center justify-center p-2.5 xl:flex xl:p-5">
                                <p className="text-black">{job.experience}</p>
                            </div>
                            <div className="hidden items-center justify-center p-2.5 xl:flex xl:p-5">
                                <p className="text-black">{job.salary}</p>
                            </div>
                            <div className="hidden items-center justify-center p-2.5 xl:flex xl:p-5">
                                <p className="text-black">{job.status}</p>
                            </div>
                            <div className="hidden items-center justify-center p-2.5 xl:flex xl:p-5">
                                <p className="text-black">
                                    <Link href={`${job.portfolio}`} target="_blank" rel="noopener noreferrer">Link</Link>
                                </p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 xl:flex xl:p-5">
                                <Link href={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/uploadPdf/${job.resume}`}>
                                    <p className="text-black">CV</p>
                                </Link>

                            </div>
                        </div>
                    ))
                ) : loading ? (
                    <p>Loading...</p>
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>





        </div>
    );
};

export default ViewApplicantsTable;
