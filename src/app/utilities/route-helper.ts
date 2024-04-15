import { ActivatedRoute } from "@angular/router";
import { StudySetService } from "../services/study-set/study-set.service";
import { map, mergeMap } from 'rxjs/operators';
import { RouteParamNotFound } from "../errors/route-param-error";

export function getStudySetFromUrl(route: ActivatedRoute, service: StudySetService) {
  return route.queryParamMap.pipe(mergeMap(params => {
    const sid = params.get("sid");
    if (sid) {
      return service.getStudySet(sid).pipe(map(sSet => sSet));
    }
    throw new RouteParamNotFound("sid not found");
  }));
}
