"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { doctorColumns } from "./doctorsColumns";


const DoctorsTable = ({ initialQueryString }: { initialQueryString: string }) => {

    // const doctorColumns : ColumnDef<IDoctor>[] = [
    //   { accessorKey: "name", header: "Name"},
    // //   { accessorKey: "specialization", header: "Specialization" },
    //   { accessorKey: "experience", header: "Experience" },
    // //   { accessorKey: "rating", header: "Rating" },
    // ];

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isSortingTransitionPending, startSortingTransition] = useTransition();

    const queryStringFromUrl = useMemo(() => searchParams.toString(), [searchParams]);
    const queryString = queryStringFromUrl || initialQueryString;

    const sortingStateFromUrl = useMemo<SortingState>(() => {
      const sortBy = searchParams.get("sortBy");
      const sortOrder = searchParams.get("sortOrder");

      if (!sortBy || (sortOrder !== "asc" && sortOrder !== "desc")) {
        return [];
      }

      return [{ id: sortBy, desc: sortOrder === "desc" }];
    }, [searchParams]);

    const [optimisticSortingState, setOptimisticSortingState] = useState<SortingState>(sortingStateFromUrl);

    useEffect(() => {
      setOptimisticSortingState(sortingStateFromUrl);
    }, [sortingStateFromUrl]);

    const handleSortingChange = (state: SortingState) => {
      setOptimisticSortingState(state);

      const params = new URLSearchParams(searchParams.toString());
      const nextSorting = state[0];

      if (nextSorting) {
        params.set("sortBy", nextSorting.id);
        params.set("sortOrder", nextSorting.desc ? "desc" : "asc");
      } else {
        params.delete("sortBy");
        params.delete("sortOrder");
      }

      // Reset to first page when sort order changes.
      params.set("page", "1");

      const nextQuery = params.toString();
      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      // Update URL immediately for optimistic UX, then refresh server components.
      window.history.pushState(null, "", nextUrl);

      startSortingTransition(() => {
        router.refresh();
      });
    };

    const { data : doctorDataResponse, isLoading, isFetching } = useQuery({
      queryKey: ["doctors", queryString],
      queryFn: () => getDoctors(queryString)
    });

    const doctors = doctorDataResponse?.data ?? [];

    const handleView = (doctor : IDoctor) => {
        console.log("View doctor", doctor);
    }

    const handleEdit = (doctor : IDoctor) => {
        console.log("Edit doctor", doctor);
    }

    const handleDelete = (doctor : IDoctor) => {
        console.log("Delete doctor", doctor);
    }


    // const { getHeaderGroups, getRowModel } = useReactTable({
    //    data: doctors,
    //    columns: doctorColumns,
    //    getCoreRowModel: getCoreRowModel(),
    // });   

    // console.log(doctorDataResponse?.data.map(doctor => doctor.name));

    console.log(doctors);
  // return (
  //   <Table>
  //     <TableHeader>
  //       {getHeaderGroups().map((hg) => (
  //         <TableRow key={hg.id}>
  //           {hg.headers.map((header) => (
  //             <TableHead key={header.id}>
  //               {flexRender(
  //                 header.column.columnDef.header,
  //                 header.getContext(),
  //               )}
  //             </TableHead>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableHeader>
  //     <TableBody>
  //       {getRowModel().rows.map((row) => (
  //         <TableRow key={row.id}>
  //           {row.getVisibleCells().map((cell) => (
  //             <TableCell key={cell.id}>
  //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //             </TableCell>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // );

    return (
      <DataTable
        data={doctors}
        columns={doctorColumns}
        isLoading={isLoading || isFetching || isSortingTransitionPending}
        emptyMessage="No doctors found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        actions={
          {
            onView : handleView,
            onEdit : handleEdit,
            onDelete : handleDelete
          }
        }
      />
    )

}




export default DoctorsTable